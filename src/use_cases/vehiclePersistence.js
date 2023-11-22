const VehicleEntity = require('../entities/vehicleEntity');
const VehicleRepository = require('../repositories/vehicleRepository');

class VehiclePersistence {
    constructor() {
        this.vehicleRepository = new VehicleRepository();
    }

    async create(vehicleData) {
        const vehicle = new VehicleEntity(vehicleData);
        
        const validation = await vehicle.validator();
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }

        return this.vehicleRepository.create(vehicle);
    }
}

module.exports = VehiclePersistence;