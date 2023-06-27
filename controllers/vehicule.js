const Vehicule = require('../models/vehicule')

module.exports = {
    createVehicule: async (req, res) => {
        const vehicule = new Vehicule(req.body)
        try {
            await vehicule.save()
            res.status(201).send(vehicule)
        } catch (e) {
            res.status(400).send(e)
        }
    },
    getAllVehicule: async (req, res) => {
        try {
            const vehicules = await Vehicule.find({}).sort({createdAt: -1})
            res.send(vehicules)
        } catch (e) {
            res.status(500).send()
        }
    },
    getVehiculeByID: async (req, res) => {
        const _id = req.params.id
        try {
            const vehicule = await Vehicule.findById(_id)
            if (!vehicule) {
                return res.status(404).send()
            }
            res.send(vehicule)
        } catch (e) {
            res.status(500).send()
        }
    },
    updateVehicule: async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdatesArray = ['type', 'marque', 'immatricule', 'volume']
        const isValidOp = updates.every((update) => allowedUpdatesArray.includes(update))
        if (!isValidOp) {
            return res.status(400).send({ error: 'INVALID UPDATES !' })
        }
        try {
            const vehicule = await Vehicule.findById(req.params.id)
            updates.forEach((update) => vehicule[update] = req.body[update])
            await vehicule.save()
            if (!vehicule) {
                return res.status(404).send()
            }
            res.send(vehicule)
        } catch (e) {
            res.status(400).send(e)
        }
    },
    deleteVehicule: async (req, res) => {
        try {
            const vehicule = await Vehicule.findByIdAndDelete(req.params.id)
            if (!vehicule) {
                return res.status(404).send()
            }
            res.send(vehicule)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}