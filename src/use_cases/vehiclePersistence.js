const { VehicleEntity } = require('../entities/vehicleEntity');
const VehicleRepository = require('../repositories/vehicleRepository');
const NotFoundError = require('../utils/notFoundError');

class VehiclePersistence {
    constructor() {
        this.vehicleRepository = new VehicleRepository();
    }

    async create(vehicleData) {
        const vehicle = new VehicleEntity(vehicleData);
        
        const validation = await vehicle.validator();
        if (!validation.isValid) {
            throw new Error(validation.errors.join('\n'));
        }

        return this.vehicleRepository.create(vehicle);
    }

    async update(id, updatedVehicleData) {
        const existingVehicleData = await this.vehicleRepository.getById(id);
        if (!existingVehicleData) {
            throw new NotFoundError('Vehicle not found.');
        }
    
        const mergedVehicleData = { ...existingVehicleData, ...updatedVehicleData };
        const vehicle = new VehicleEntity(mergedVehicleData);
    
        const validation = await vehicle.validator();
        if (!validation.isValid) {
            throw new Error(validation.errors.join('\n'));
        }
    
        return this.vehicleRepository.update(id, vehicle);
    }

    async delete(id) {
        return this.vehicleRepository.delete(id);
    }

    async getByLicensePlate(licensePlate) {
        const vehicle = await this.vehicleRepository.getByLicensePlate(licensePlate);
        if (!vehicle) {
            throw new NotFoundError('Vehicle not found.');
        }
        
        return vehicle;
    }
}

module.exports = VehiclePersistence;