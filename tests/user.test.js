const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { admin, adminId, driver, driverId, setupDatabase } = require('./db')
const mongoose = require('mongoose')

const testId = new mongoose.Types.ObjectId()
beforeEach(setupDatabase)

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: admin.email,
        password: admin.password
    }).expect(200)

    const user = await User.findById(adminId)
    expect(response.body.token).toBe(user.token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: driver.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

test('Should create a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            matricule: '0000',
            nom: 'nom test',
            prenom: 'prenom test',
            CIN: '00112233',
            tel: '53555555',
            email: 'test1@test.com',
            password: 'testtest',
            role: 'CHAUFFEUR'
        })
        .set('Authorization', `Bearer ${admin.token}`)
        .expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body).toMatchObject({
        user: {
            matricule: '0000',
            nom: 'nom test',
            prenom: 'prenom test',
            CIN: '00112233',
            tel: '53555555',
            email: 'test1@test.com',
            role: 'CHAUFFEUR'
        },
    })
    expect(user.password).not.toBe('testtest')
})

test('Should not create a new user for unauthorized users', async () => {
    await request(app)
        .post('/users')
        .send({
            matricule: '0000',
            nom: 'nom test',
            prenom: 'prenom test',
            CIN: '00112233',
            tel: '53555555',
            email: 'test1@test.com',
            password: 'testtest',
            role: 'CHAUFFEUR'
        })
        .expect(401)
})

test('Should not create a new user for drivers', async () => {
    await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${driver.token}`)
        .send({
            matricule: '0000',
            nom: 'nom test',
            prenom: 'prenom test',
            CIN: '00112233',
            tel: '53555555',
            email: 'test1@test.com',
            password: 'testtest',
            role: 'CHAUFFEUR'
        })
        .expect(401)
})

test('Should not create a new user with invalid data', async () => {
    await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${admin.token}`)
        .send({
            matricule: '0000',
            nom: 'nom test',
            prenom: 'prenom test',
            CIN: '00112233',
            tel: '53555555',
            email: 'driver@test.com',
            password: 'testtest',
            role: 'CHAUFFEUR'
        })
        .expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${driver.token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should get all users', async () => {
    await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${admin.token}`)
        .send()
        .expect(200)
})

test('Should not get all users for unauthorized users', async () => {
    await request(app)
        .get('/users')
        .send()
        .expect(401)
})

test('Should not get all users for drivers', async () => {
    await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${driver.token}`)
        .send()
        .expect(401)
})

test('Should logout', async () => {
    await request(app)
        .post('/users/logout')
        .set('Authorization', `Bearer ${driver.token}`)
        .send()
        .expect(200)
})

test('Should logout fail for unauthenticated users', async () => {
    await request(app)
        .post('/users/logout')
        .send()
        .expect(401)
})

test('Should get a user by ID', async () => {
    await request(app)
        .get(`/users/${driverId}`)
        .set('Authorization', `Bearer ${admin.token}`)
        .send()
        .expect(200)
})

test('Should not get a nonexistant user by ID', async () => {
    await request(app)
        .get(`/users/${testId}`)
        .set('Authorization', `Bearer ${admin.token}`)
        .send()
        .expect(404)
})

test('Should not get a user by ID for unauthorized users', async () => {
    await request(app)
        .get(`/users/${driverId}`)
        .send()
        .expect(401)
})

test('Should not get a user by ID for drivers', async () => {
    await request(app)
        .get(`/users/${driverId}`)
        .set('Authorization', `Bearer ${driver.token}`)
        .send()
        .expect(401)
})

test('Should update a user data', async () => {
    const response = await request(app).patch(`/users/${driverId}`)
        .set('Authorization', `Bearer ${admin.token}`)
        .send({
            nom: 'updated name'
        })
        .expect(200)

    expect(response.body.nom).toEqual('updated name')
})

test('Should not update a user data for unauthorized users', async () => {
    await request(app)
        .patch(`/users/${driverId}`)
        .send({
            nom: 'updated name'
        })
        .expect(401)
})

test('Should not update a user data for drivers', async () => {
    await request(app)
        .patch(`/users/${driverId}`)
        .set('Authorization', `Bearer ${driver.token}`)
        .send({
            nom: 'updated name'
        })
        .expect(401)
})

test('Should not update a nonexistant user data', async () => {
    await request(app)
        .patch(`/users/${testId}`)
        .set('Authorization', `Bearer ${admin.token}`)
        .send({
            nom: 'updated name'
        })
        .expect(404)
})

test('Should not update a user with invalid data', async () => {
    await request(app)
        .patch(`/users/${driverId}`)
        .set('Authorization', `Bearer ${admin.token}`)
        .send({
            role: 'ADMINEE'
        })
        .expect(400)
})

test('Should delete a user', async () => {
    const response = await request(app).delete(`/users/${driverId}`)
        .set('Authorization', `Bearer ${admin.token}`)
        .send()
        .expect(200)

    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})

test('Should not delete a user for unauthorized users', async () => {
    await request(app)
        .delete(`/users/${driverId}`)
        .send()
        .expect(401)
})

test('Should not delete a user for drivers', async () => {
    await request(app)
        .delete(`/users/${driverId}`)
        .set('Authorization', `Bearer ${driver.token}`)
        .send()
        .expect(401)
})

test('Should not delete a nonexistant user ', async () => {
    await request(app)
        .delete(`/users/${testId}`)
        .set('Authorization', `Bearer ${admin.token}`)
        .send()
        .expect(404)
})