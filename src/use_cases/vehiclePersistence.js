const { VehicleEntity } = require('../entities/vehicleEntity');
const VehicleValidator = require('../validators/vehicleValidator');
const VehicleRepository = require('../repositories/vehicleRepository');
const NotFoundError = require('../utils/notFoundError');

class VehiclePersistence {
    constructor() {
        this.vehicleRepository = new VehicleRepository();
    }

    async create(vehicleData) {
        // Validate the data
        const { error } = VehicleValidator.validateCreate(vehicleData);
        if (error) {
            throw new Error(`Invalid vehicle data: ${error.details[0].message}.`);
        }

        const vehicle = new VehicleEntity(vehicleData);
        
        const validation = await vehicle.validator();
        if (!validation.isValid) {
            throw new Error(validation.errors.join('\n'));
        }

        return this.vehicleRepository.create(vehicle);
    }

    async update(id, updatedVehicleData) {
         // Validate the data
        const { error } = VehicleValidator.validateUpdate(updatedVehicleData);
        if (error) {
            throw new Error(`Invalid vehicle data: ${error.details[0].message}.`);
        }

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

    async getById(id) {
        const vehicle = await this.vehicleRepository.getById(id);
        if (!vehicle) {
            throw new NotFoundError('Vehicle not found.');
        }
        
        return vehicle;
    }

    async getByLicensePlate(licensePlate) {
        const vehicle = await this.vehicleRepository.getByLicensePlate(licensePlate);
        if (!vehicle) {
            throw new NotFoundError('Vehicle not found.');
        }
        
        return vehicle;
    }

    async getAllVehicles() {
        try {
            const allVehicles = await this.vehicleRepository.getAll();
            return allVehicles;
        } catch (error) {
            throw new Error(`Error getting all vehicles: ${error.message}`);
        }
    }
}

module.exports = VehiclePersistence;