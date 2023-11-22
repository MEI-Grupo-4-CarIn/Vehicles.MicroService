const express = require('express');
const VehicleController = require('../controllers/vehicleController');

const router = express.Router();
const vehicleController = new VehicleController();

router.post('/vehicles/create', (req, res) => vehicleController.createVehicle(req, res));

module.exports = router;