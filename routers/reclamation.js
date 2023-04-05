const express = require('express')
const Controller = require('../controllers/reclamation')
const { auth, adminAuth, chauffeurAuth } = require('../middlewares/auth')
const router = new express.Router()

router.post('/reclamations', chauffeurAuth, Controller.createReclamation)
router.get('/reclamations', auth, Controller.getAllReclamations)
router.get('/reclamations/:id', auth, Controller.getReclamationByID)
router.patch('/reclamations/:id', auth, Controller.updateReclamation)
router.delete('/reclamations/:id', auth, Controller.deleteReclamation)

module.exports = router