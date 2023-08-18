const mongoose = require('mongoose')
const User = require('../models/user')
const Vehicule = require('../models/vehicule')
const jwt = require('jsonwebtoken')

const adminId = new mongoose.Types.ObjectId()
const driverId = new mongoose.Types.ObjectId()
const vehiculeId = new mongoose.Types.ObjectId()


const admin = {
    _id: adminId,
    matricule: 'admin-00',
    nom: 'test',
    prenom: 'admin',
    CIN: '00112233',
    tel: '53555555',  
    email: 'admin@test.com',
    password: 'adminadmin',
    role: 'ADMIN',
    token: jwt.sign({ _id: adminId }, process.env.JWT_SECRET_KEY)

}

const driver = {
    _id: driverId,
    matricule: 'ch-00',
    nom: 'test',
    prenom: 'driver',
    CIN: '00112233',
    tel: '53555555',
    email: 'driver@test.com',
    password: 'driver00',
    role: 'CHAUFFEUR',
    token: jwt.sign({ _id: driverId }, process.env.JWT_SECRET_KEY)

}

const vehicule = {
    _id: vehiculeId,
    immatricule: "200 Tunis 1000",
    type: "Camion",
    marque:"Iveco",
    volume : "200 Kg"
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Vehicule.deleteMany()
    await new User(admin).save()
    await new User(driver).save()
    await new Vehicule(vehicule).save()
}

module.exports = {
    admin,
    adminId,
    driver,
    driverId,
    vehicule,
    vehiculeId,
    setupDatabase
}