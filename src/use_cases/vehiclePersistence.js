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

    async update(id, updatedVehicleData) {
        const vehicle = new VehicleEntity(updatedVehicleData);

        const validation = await vehicle.validator();
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }

        return this.vehicleRepository.update(id, updatedVehicleData);
    }

    async delete(id) {
        return this.vehicleRepository.delete(id);
    }
}

module.exports = VehiclePersistence;