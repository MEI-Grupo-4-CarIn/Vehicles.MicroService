const VehicleModel = require('../frameworks/database/vehicleModel');

class VehicleRepository {
    
    async create(vehicle) {
        const newVehicle = new VehicleModel(vehicle);
        return await newVehicle.save();
    }
}

module.exports = VehicleRepository;