const express = require('express')
const Controller = require('../controllers/vehicule')
const { auth, adminAuth } = require('../middlewares/auth')
const router = new express.Router()

router.post('/vehicules', Controller.createVehicule)
router.get('/vehicules', Controller.getAllVehicule)
router.get('/vehicules/:id', Controller.getVehiculeByID)
router.patch('/vehicules/:id', Controller.updateVehicule)
router.delete('/vehicules/:id',  Controller.deleteVehicule)

module.exports = router