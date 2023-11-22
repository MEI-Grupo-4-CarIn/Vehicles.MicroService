exports.VehicleEntity = class VehicleEntity {
    constructor(id, model, brand, licensePlate, vin, color, registerDate, acquisitionDate, category, kms, capacity, fuelType, averageFuelConsumption, status) {
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.licensePlate = licensePlate;
        this.vin = vin;
        this.color = color;
        this.registerDate = registerDate;
        this.acquisitionDate = acquisitionDate;
        this.category = category;
        this.kms = kms;
        this.capacity = capacity;
        this.fuelType = fuelType;
        this.averageFuelConsumption = averageFuelConsumption;
        this.status = status;
    }

    async validator() {
        if (!this.id || !this.model || !this.brand || !this.licensePlate || !this.vin || !this.color || !this.registerDate || !this.acquisitionDate || !this.category || !this.kms || !this.capacity || !this.fuelType || !this.averageFuelConsumption || !this.status) {
            throw new Error('All fields are required');
        }
        
        // Add more specific validations here if needed
    }
}