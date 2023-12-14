const Joi = require('joi');

class VehicleValidator {
    static createVehicleSchema = Joi.object({
        model: Joi.string().required(),
        brand: Joi.string().required(),
        licensePlate: Joi.string().required(),
        vin: Joi.string().required(),
        color: Joi.string().required(),
        registerDate: Joi.date().iso().required(),
        acquisitionDate: Joi.date().iso().required(),
        category: Joi.string().required(),
        kms: Joi.number().required(),
        capacity: Joi.number().required(),
        fullType: Joi.string().valid('diesel', 'petrol', 'eletric').required(),
        averageFuelConsumption: Joi.number().required(),
        status: Joi.string().valid('none', 'permanent', 'inUse', 'repairing').required(),
        avoidTolls: Joi.boolean(),
        avoidHighways: Joi.boolean()
    });

    static updateVehicleSchema = Joi.object({
        color: Joi.string(),
        category: Joi.string(),
        kms: Joi.number(),
        capacity: Joi.number(),
        averageFuelConsumption: Joi.number(),
        status: Joi.string().valid('none', 'permanent', 'inUse', 'repairing'),
        avoidTolls: Joi.boolean(),
        avoidHighways: Joi.boolean()
    }).min(1);

    static validateCreate(data) {
        return this.createVehicleSchema.validate(data);
    }

    static validateUpdate(data) {
        return this.updateVehicleSchema.validate(data);
    }
}

module.exports = VehicleValidator;