const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    id: { type: String, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    licensePlate: { type: String, required: true },
    vin: { type: String, required: true },
    color: { type: String, required: true },
    registerDate: { type: Date, required: true },
    acquisitionDate: { type: Date, required: true },
    category: { type: String, required: true },
    kms: { type: Number, required: true },
    capacity: { type: Number, required: true },
    fuelType: { type: String, required: true },
    averageFuelConsumption: { type: Number, required: true },
    status: {
        type: String,
        enum: ['none', 'permanent', 'inUse', 'repairing'],
        default: 'none'
    },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
