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
}

module.exports = VehicleController;