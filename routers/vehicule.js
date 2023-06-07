const express = require('express')
const Controller = require('../controllers/vehicule')
const { auth, adminAuth } = require('../middlewares/auth')
const router = new express.Router()

router.post('/vehicules', adminAuth, Controller.createVehicule)
router.get('/vehicules', adminAuth, Controller.getAllVehicule)
router.get('/vehicules/:id', auth, Controller.getVehiculeByID)
router.patch('/vehicules/:id', adminAuth, Controller.updateVehicule)
router.delete('/vehicules/:id', adminAuth, Controller.deleteVehicule)

module.exports = router