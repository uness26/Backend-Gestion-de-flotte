const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Role = require('../models/role')


const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decode = jwt.verify(token, 'new')
    const user = await User.findOne({ _id: decode._id, 'token': token })
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (err) {
    res.status(401).send({ message: 'unauthorized' })
  }
}


const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decode = jwt.verify(token, 'new')
    const user = await User.findOne({ _id: decode._id, 'token': token })
    if (!user || user?.role !== Role.ADMIN) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (err) {
    res.status(401).send({ message: ' unauthorized' })
  }
}


const chauffeurAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decode = jwt.verify(token, 'new')
    const user = await User.findOne({ _id: decode._id, 'token': token})
    if (!user || user?.role !== Role.CHAUFFEUR) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (err) {
    res.status(401).send({ message: 'unauthorized' })
  }
}

module.exports = {
  auth,
  adminAuth,
  chauffeurAuth
}