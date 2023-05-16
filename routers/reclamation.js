const express = require('express')
const Controller = require('../controllers/reclamation')
const { auth, adminAuth, chauffeurAuth } = require('../middlewares/auth')
const router = new express.Router()

router.post('/reclamations',  Controller.createReclamation)
router.get('/reclamations',  Controller.getAllReclamations)
router.get('/reclamations/:id',  Controller.getReclamationByID)
router.patch('/reclamations/:id',  Controller.updateReclamation)
router.delete('/reclamations/:id',  Controller.deleteReclamation)

module.exports = router