const express = require('express')
const Controller = require('../controllers/user')
const { auth, adminAuth, chauffeurAuth } = require('../middlewares/auth')
const router = new express.Router()

router.post('/users', Controller.createUser)
router.post('/users/login', Controller.login)
router.post('/users/logout', auth, Controller.logout)
router.get('/users/me', auth, Controller.getUser)
router.get('/users', Controller.getAllUsers)
router.get('/users/:id', Controller.getUserByID)
router.patch('/users/:id', Controller.updateUser)
router.delete('/users/:id', adminAuth, Controller.deleteUser)




module.exports = router