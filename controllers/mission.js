const Mission = require('../models/mission')

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
            if (req.user?.role === "ADMIN") {
                const missions = await Mission.find({})
                    .populate(['chauffeur', 'vehicule'])
                    .sort({ createdAt: -1 });
                res.send(missions)
            } else {
                const missions = await Mission.find({ chauffeur: req.user._id })
                    .populate(['chauffeur', 'vehicule'])
                    .sort({ createdAt: -1 });
                res.send(missions)
            }
        } catch (e) {
            res.status(500).send()
        }
    },
    getMissionByID: async (req, res) => {
        const _id = req.params.id
        try {
            const mission = await Mission.findById(_id).populate(['chauffeur', 'vehicule']);
            if (!mission) {
                return res.status(404).send()
            }
            res.send(mission)
        } catch (e) {
            res.status(500).send()
        }
    },
    updateMission: async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdatesArray = ['date', 'lieuDep', 'heureDep', 'heureArr', 'lieuArr', 'etat', 'chauffeur', 'vehicule']
        const isValidOp = updates.every((update) => allowedUpdatesArray.includes(update))
        if (!isValidOp) {
            return res.status(400).send({ error: 'INVALID UPDATES !' })
        }
        try {
            const mission = await Mission.findById(req.params.id).populate(['chauffeur', 'vehicule']);
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
