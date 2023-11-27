exports.VehicleEntity = class VehicleEntity {
    constructor(data) {
        const fields = VehicleEntity.getFields();
        fields.forEach(field => {
            if (field in data) {
                this[field] = data[field];
            }
        });
    }

    static getFields() {
        return ['model',
            'brand',
            'licensePlate',
            'vin',
            'color',
            'registerDate',
            'acquisitionDate',
            'category',
            'kms',
            'capacity',
            'fuelType',
            'averageFuelConsumption',
            'status'];
    }

    async validator() {
        if (Object.keys(this).length === 0) {
            throw new Error('Payload cannot be empty.');
        }

        const fields = VehicleEntity.getFields();
        const errors = [];
        for (let field of fields) {
            if (this[field] !== undefined && (this[field] === null || this[field] === '')) {
                errors.push(`${field} cannot be null or empty`);
            }
            // Add more specific validations here if needed
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}