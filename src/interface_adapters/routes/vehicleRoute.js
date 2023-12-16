const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const VehicleController = require('../controllers/vehicleController');

const router = express.Router();
const vehicleController = new VehicleController();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Operations related to vehicles
 * 
 * definitions:
 *   Vehicle:
 *     type: object
 *     properties:
 *       model:
 *         type: string
 *         description: The model of the vehicle
 *       brand:
 *         type: string
 *         description: The brand of the vehicle
 *       licensePlate:
 *         type: string
 *         description: The license plate of the vehicle
 *       vin:
 *         type: string
 *         description: The VIN (Vehicle Identification Number) of the vehicle
 *       color:
 *         type: string
 *         description: The color of the vehicle
 *       registerDate:
 *         type: string
 *         format: date
 *         description: The registration date of the vehicle
 *       acquisitionDate:
 *         type: string
 *         format: date
 *         description: The acquisition date of the vehicle
 *       category:
 *         type: string
 *         description: The category of the vehicle
 *       kms:
 *         type: number
 *         description: The kilometers driven by the vehicle
 *       capacity:
 *         type: number
 *         description: The capacity of the vehicle
 *       fuelType:
 *         type: string
 *         description: The type of fuel used by the vehicle
 *       averageFuelConsumption:
 *         type: number
 *         description: The average fuel consumption of the vehicle
 *       status:
 *         type: string
 *         description: The status of the vehicle
 */

/**
 * @swagger
 * /api/vehicles/create:
 *   post:
 *     tags:
 *       - Vehicles
 *     summary: Create new vehicles.
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Vehicle'
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *         schema:
 *           $ref: '#/definitions/Vehicle'
 *       400:
 *         description: Error creating the vehicle
 */
router.post('/vehicles/create', authMiddleware(['Manager']), (req, res) => vehicleController.createVehicle(req, res));

/**
 * @swagger
 * /api/vehicles/update:
 *   patch:
 *     tags:
 *       - Vehicles
 *     summary: Update specific information about a certain vehicle by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         type: string
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Vehicle'
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         schema:
 *           $ref: '#/definitions/Vehicle'
 *       404:
 *         description: Vehicle not found
 *       400:
 *         description: Error updating the vehicle
 */
router.patch('/vehicles/update/:id', authMiddleware(['Manager']), (req, res) => vehicleController.updateVehicle(req, res));

/**
 * @swagger
 * /api/vehicles/delete:
 *   delete:
 *     tags:
 *       - Vehicles
 *     summary: Delete vehicle by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         type: string
 *     responses:
 *       204:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 *       400:
 *         description: Error deleting the vehicle
 */
router.delete('/vehicles/delete/:id', authMiddleware(['Manager']), (req, res) => vehicleController.deleteVehicle(req, res));

/**
 * @swagger
 * /api/vehicles/getById:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Get informations about a vehicle by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         type: string
 *     responses:
 *       200:
 *         description: Vehicle obtained successfully
 *         schema:
 *           $ref: '#/definitions/Vehicle'
 *       404:
 *         description: Vehicle not found
 *       400:
 *         description: Error obtaining the vehicle
 */
router.get('/vehicles/:id', authMiddleware(['Manager']), (req, res) => vehicleController.getById(req, res));

/**
 * @swagger
 * /api/vehicles/getAllVehicles:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Get informations about all existing vehicles.
 *     responses:
 *       200:
 *         description: Vehicles obtained successfully.
 */
 router.get('/vehicles', authMiddleware(['Admin', 'Manager']), (req, res) => vehicleController.getAllVehicles(req, res));
 
/**
 * @swagger
 * /api/vehicles/licensePlate:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Get vehicle information by license plate.
 *     parameters:
 *       - in: path
 *         name: licensePlate
 *         required: true
 *         description: Vehicle license plate
 *         type: string
 *     responses:
 *       200:
 *         description: Vehicle obtained successfully
 *         schema:
 *           $ref: '#/definitions/Vehicle'
 *       404:
 *         description: Vehicle not found
 *       400:
 *         description: Error obtaining the vehicle
 */
router.get('/vehicles/getByLicensePlate/:licensePlate', authMiddleware(['Manager']), (req, res) => vehicleController.getByLicensePlate(req, res));

module.exports = router;