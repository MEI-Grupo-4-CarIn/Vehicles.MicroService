const VehiclePersistence = require('../../use_cases/vehiclePersistence');
const NotFoundError = require('../../utils/notFoundError');
const Logger = require('../../frameworks/logging/logger');

class VehicleController {
    constructor() {
        this.vehiclePersistence = new VehiclePersistence();
    }

    async createVehicle(req, res) {
        try {
            const vehicle = await this.vehiclePersistence.create(req.body);
            Logger.info(`Vehicle created by the user '${req.user.email}' with success! Info: '${vehicle.id}'.`);
            res.status(201).json(vehicle);
        } catch (error) {
            Logger.error(`Error creating vehicle: ${error.message}`,error);
            res.status(400).json({ message: error.message });
        }
    }

    async updateVehicle(req, res) {
        try {
            const { id } = req.params;
            const updatedVehicle = await this.vehiclePersistence.update(id, req.body);
            Logger.info(`Vehicle '${id}' successfully updated by the user '${req.user.email}'.`)
            res.status(200).json(updatedVehicle);
        } catch (error) {
            Logger.error(`Error updating vehicle '${req.params.id}': ${error.message}`,error);
            res.status(400).json({ message: error.message });
        }
    }

    async deleteVehicle(req, res) {
        try {
            const { id } = req.params;
            await this.vehiclePersistence.delete(id);
            Logger.info(`Vehicle '${id}' deleted by the user '${req.user.email}'.`)
            res.status(200).json({ message: "Vehicle has been successfully deleted." });
        } catch (error) {
            Logger.error(`Error deleting vehicle '${req.params.id}': ${error.message}`,error);
            res.status(400).json({ message: error.message });
        }
    }
    
    async getById(req, res) {
        try {
            const { id } = req.params;
            const vehicle = await this.vehiclePersistence.getById(id);
            res.status(200).json(vehicle);
        } catch (error) {
            Logger.error(`Error obtaining vehicle '${req.params.id}': ${error.message}`,error);
            if (error instanceof NotFoundError) {
                return res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async getByLicensePlate(req, res) {
        try {
            const { licensePlate } = req.params;
            const vehicle = await this.vehiclePersistence.getByLicensePlate(licensePlate);
            res.status(200).json(vehicle);
        } catch (error) {
            Logger.error(`Error obtaining vehicle '${req.params.licensePlate}': ${error.message}`,error);
            if (error instanceof NotFoundError) {
                return res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async getAllVehicles(req, res) {
        try {
            const vehicles = await this.vehiclePersistence.getAllVehicles();
            if (vehicles.length === 0) {
                return res.status(404).json({ message: 'No vehicles found.' });
            }
            res.status(200).json(vehicles);
        } catch (error) {
            Logger.error(`Error obtaining vehicles list '${req.params.id}': ${error.message}`,error);
            res.status(500).json({ message: error.message });
        }
    }
    
}

module.exports = VehicleController;
