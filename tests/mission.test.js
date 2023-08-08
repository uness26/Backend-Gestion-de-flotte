const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Mission = require('../models/mission')
const { admin, adminId, driver, driverId, vehiculeId, setupDatabase } = require('./db')
const mongoose = require('mongoose')

const testId = new mongoose.Types.ObjectId()

beforeEach(setupDatabase)

test('Should create a mission', async () => {
    const response = await request(app).post('/missions')
        .set('Authorization', `Bearer ${admin.token}`)
        .send({
            date: "2023-03-23",
            heureDep: "04:00",
            lieuDep: "Tunis",
            lieuArr: "Sfax",
            chauffeur: driverId,
            vehicule: vehiculeId
        })
        .expect(201)

        const mission = await Mission.findById(response.body._id)
        expect(mission).not.toBeNull()
})