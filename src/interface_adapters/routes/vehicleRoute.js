const express = require('express');
const VehicleController = require('../controllers/vehicleController');

const router = express.Router();
const vehicleController = new VehicleController();

router.post('/vehicles/create', (req, res) => vehicleController.createVehicle(req, res));
router.put('/vehicles/:id', (req, res) => vehicleController.updateVehicle(req, res));
router.delete('/vehicles/:id', (req, res) => vehicleController.deleteVehicle(req, res));

module.exports = router;