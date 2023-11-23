const VehicleModel = require('../frameworks/database/vehicleModel');

class VehicleRepository {
    
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