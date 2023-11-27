const VehicleModel = require('../frameworks/database/vehicleModel');

class VehicleRepository {
    
    async getById(id) {
        return await VehicleModel.findById(id);
    }
    
    async getByLicensePlate(licensePlate) {
        return await VehicleModel.findOne({ licensePlate: licensePlate });
    }

    async create(vehicle) {
        const newVehicle = new VehicleModel(vehicle);
        return await newVehicle.save();
    }

    async update(id, updatedVehicleData) {
        const updatedVehicle = await VehicleModel.findByIdAndUpdate(id, updatedVehicleData, { new: true });
        return updatedVehicle;
    }

    async delete(id) {
        await VehicleModel.findByIdAndDelete(id);
    }
}

module.exports = VehicleRepository;