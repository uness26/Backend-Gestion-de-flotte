const express = require('express')
const Controller = require('../controllers/mission')
const { auth, adminAuth } = require('../middlewares/auth')
const router = new express.Router()

router.post('/missions', adminAuth, Controller.createMission)
router.get('/missions', Controller.getAllMissions)
router.get('/missions/:id', auth, Controller.getMissionByID)
router.patch('/missions/:id', adminAuth, Controller.updateMission)
router.delete('/missions/:id', adminAuth, Controller.deleteMission)

module.exports = router