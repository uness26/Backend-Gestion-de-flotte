const express = require('express')
const Controller = require('../controllers/user')
const { auth, adminAuth, chauffeurAuth } = require('../middlewares/auth')
const router = new express.Router()

router.post('/users', adminAuth, Controller.createUser)
router.post('/users/login', Controller.login)
router.post('/users/signup', Controller.signup)
router.post('/users/logout', auth, Controller.logout)
router.get('/users/me', auth, Controller.getUser)
router.get('/users', adminAuth, Controller.getAllUsers)
router.get('/users/:id', adminAuth, Controller.getUserByID)
router.patch('/users/:id', adminAuth, Controller.updateUser)
router.delete('/users/:id', adminAuth, Controller.deleteUser)



module.exports = router