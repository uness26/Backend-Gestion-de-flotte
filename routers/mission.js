const express = require('express')
const Controller = require('../controllers/mission')
const { auth, adminAuth } = require('../middlewares/auth')
const router = new express.Router()

router.post('/missions',  Controller.createMission)
router.get('/missions', Controller.getAllMissions)
router.get('/missions/:id', Controller.getMissionByID)
router.patch('/missions/:id', Controller.updateMission)
router.delete('/missions/:id',  Controller.deleteMission)

module.exports = router