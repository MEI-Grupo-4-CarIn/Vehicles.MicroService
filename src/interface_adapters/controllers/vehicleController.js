const VehiclePersistence = require('../../use_cases/vehiclePersistence');

class VehicleController {
    constructor() {
        this.vehiclePersistence = new VehiclePersistence();
    }

    async createVehicle(req, res) {
        try {
            const vehicle = await this.vehiclePersistence.create(req.body);
            res.status(201).json(vehicle);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateVehicle(req, res) {
        try {
            const { id } = req.params;
            const updatedVehicle = await this.vehiclePersistence.update(id, req.body);
            res.status(200).json(updatedVehicle);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteVehicle(req, res) {
        try {
            const { id } = req.params;
            await this.vehiclePersistence.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = VehicleController;