const express = require('express');
const VehicleController = require('../controllers/vehicleController');

const router = express.Router();
const vehicleController = new VehicleController();

router.post('/vehicles/create', (req, res) => vehicleController.createVehicle(req, res));
router.patch('/vehicles/update/:id', (req, res) => vehicleController.updateVehicle(req, res));
router.delete('/vehicles/delete/:id', (req, res) => vehicleController.deleteVehicle(req, res));
router.get('/vehicles/:id', (req, res) => vehicleController.getById(req, res));
router.get('/vehicles/getByLicensePlate/:licensePlate', (req, res) => vehicleController.getByLicensePlate(req, res));

module.exports = router;