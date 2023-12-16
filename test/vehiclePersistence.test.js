const VehiclePersistence = require('../src/use_cases/vehiclePersistence');
const VehicleRepository = require('../src/repositories/vehicleRepository');

jest.mock('../src/repositories/vehicleRepository');

describe('VehiclePersistence', () => {
    describe('create', () => {
        it('should create a vehicle successfully', async () => {
            const mockVehicleRepository = new VehicleRepository();
            const mockVehicleData = {
                "_id": "6575972b0e7beb961ae509e9",
                "model": "A1",
                "brand": "Audi",
                "licensePlate": "24-CD-22",
                "vin": "12345678901234564",
                "color": "white",
                "registerDate": "2020-12-10T00:00:00.000Z",
                "acquisitionDate": "2021-01-01T00:00:00.000Z",
                "category": "city",
                "kms": 134000,
                "capacity": 5,
                "fuelType": "diesel",
                "averageFuelConsumption": 6.5,
                "status": "inUse",
                "__v": 0
            };
            mockVehicleRepository.create = jest.fn().mockResolvedValue(mockVehicleData);

            const vehiclePersistence = new VehiclePersistence();
            vehiclePersistence.vehicleRepository = mockVehicleRepository;

            const vehicleData = {
                "model": "A1",
                "brand": "Audi",
                "licensePlate": "24-CD-22",
                "vin": "12345678901234564",
                "color": "white",
                "registerDate": "2020-12-10",
                "acquisitionDate": "2021-01-01",
                "category": "city",
                "kms": 134000,
                "capacity": 5,
                "fuelType": "diesel",
                "averageFuelConsumption": 6.5,
                "status": "inUse"
            };

            const vehicle = await vehiclePersistence.create(vehicleData);
            expect(vehicle).toEqual(mockVehicleData);
        });

        it('should throw an error if the vehicle data is invalid', async () => {
            const vehiclePersistence = new VehiclePersistence();

            const invalidVehicleData = {
                "model": 123, // should be a string, not a number
                "brand": "", // should not be an empty string
                // missing the required fields
            };

            await expect(vehiclePersistence.create(invalidVehicleData)).rejects.toThrow();
        });
    });

    describe('update', () => {
        it('should update a vehicle successfully', async () => {
            const mockVehicleRepository = new VehicleRepository();
        
            const existingVehicleData = {
                "_id": "6575972b0e7beb961ae509e9",
                "model": "A1",
                "brand": "Audi",
                "licensePlate": "24-CD-22",
                "vin": "12345678901234564",
                "color": "white",
                "registerDate": "2020-12-10T00:00:00.000Z",
                "acquisitionDate": "2021-01-01T00:00:00.000Z",
                "category": "city",
                "kms": 134000,
                "capacity": 5,
                "fuelType": "diesel",
                "averageFuelConsumption": 6.5,
                "status": "inUse",
                "__v": 0
            };
            mockVehicleRepository.getById = jest.fn().mockResolvedValue(existingVehicleData);
        
            const updatedVehicleData = {
                "_id": "6575972b0e7beb961ae509e9",
                "model": "A1",
                "brand": "Audi",
                "licensePlate": "24-CD-22",
                "vin": "12345678901234564",
                "color": "blue", // changed color
                "registerDate": "2020-12-10T00:00:00.000Z",
                "acquisitionDate": "2021-01-01T00:00:00.000Z",
                "category": "city",
                "kms": 134000,
                "capacity": 5,
                "fuelType": "diesel",
                "averageFuelConsumption": 6.5,
                "status": "inUse",
                "__v": 0
            };
            mockVehicleRepository.update = jest.fn().mockResolvedValue(updatedVehicleData);
        
            const vehiclePersistence = new VehiclePersistence();
            vehiclePersistence.vehicleRepository = mockVehicleRepository;
        
            const vehicleDataForUpdate = {
                "color": "blue"
            };
        
            const vehicle = await vehiclePersistence.update("6575972b0e7beb961ae509e9", vehicleDataForUpdate);
            expect(vehicle).toEqual(updatedVehicleData);
        });
        
        it('should throw an error if the vehicle data is invalid', async () => {
            const vehiclePersistence = new VehiclePersistence();
        
            const invalidVehicleData = {
                "color": 123, // should be a string, not a number
                "category": "", // should not be an empty string
                "model": "A3" // not allowed field
            };
        
            await expect(vehiclePersistence.update("6575972b0e7beb961ae509e9", invalidVehicleData)).rejects.toThrow();
        });
    });
});