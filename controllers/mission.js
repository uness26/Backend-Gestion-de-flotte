const Mission = require('../models/mission')
const User = require('../models/user')

module.exports = {
    createMission: async (req, res) => {
        const mission = new Mission(req.body)
        try {
            await mission.save()
            res.status(201).send(mission)
        } catch (e) {
            res.status(400).send(e)
        }
    },
    getAllMissions: async (req, res) => {
        try {
            const missions = await Mission.find({}).populate(['chauffeur', 'vehicule']);
            res.send(missions)
            // if (req.user?.role === "ADMIN") {
            //     const missions = await Mission.find({})
            // } else {
            //     await req.user.populate('missions')
            //     res.send(req.user.missions)
            // }
        } catch (e) {
            res.status(500).send()
        }
    },
    getMissionByID: async (req, res) => {
        const _id = req.params.id
        // let mission
        try {
            mission = await Mission.findById(_id).populate(['chauffeur', 'vehicule']);
            if (!mission) {
                return res.status(404).send()
            }
            // if (req.user.role === 'ADMIN') {
            //     mission = await Mission.findById(_id)
            // } else {
            //     mission = await Mission.findOne({ _id, chauffeur: req.user._id })
            // }
            // if (!mission) {
            //     return res.status(404).send()
            // }
            res.send(mission)
        } catch (e) {
            res.status(500).send()
        }
    },
    updateMission: async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdatesArray = ['date', 'lieuDep', 'lieuArr', 'etat', 'chauffeur', 'vehicule']
        const isValidOp = updates.every((update) => allowedUpdatesArray.includes(update))
        if (!isValidOp) {
            return res.status(400).send({ error: 'INVALID UPDATES !' })
        }
        try {
            const mission = await Mission.findById(req.params.id)
            updates.forEach((update) => mission[update] = req.body[update])
            await mission.save()
            if (!mission) {
                return res.status(404).send()
            }
            res.send(mission)
        } catch (e) {
            res.status(400).send(e)
        }
    },
    deleteMission: async (req, res) => {
        try {
            const mission = await Mission.findByIdAndDelete(req.params.id)
            if (!mission) {
                return res.status(404).send()
            }
            res.send(mission)
        } catch (e) {
            res.status(500).send(e)
        }
    },
}
