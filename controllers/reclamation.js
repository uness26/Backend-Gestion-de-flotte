const Reclamation = require('../models/reclamation')

module.exports = {
    createReclamation: async (req, res) => {
        const reclamation = new Reclamation({
            ...req.body,
            // chauffeur: req.user._id
        })
        try {
            await reclamation.save()
            res.status(201).send(reclamation)
        } catch (e) {
            res.status(400).send(e)
        }
    },
    getAllReclamations: async (req, res) => {
        try {
            const reclamations = await Reclamation.find({})
            res.send(reclamations)
            // if (req.user?.role === "ADMIN") {
            //     const reclamations = await Reclamation.find({})
            //     res.send(reclamations)
            // } else {
            //     await req.user.populate('reclamations')
            //     res.send(req.user.reclamations)
            // }
        } catch (e) {
            res.status(500).send()
        }
    },
    getReclamationByID: async (req, res) => {
        const _id = req.params.id
        // let reclamation
        try {
            const reclamation = await Reclamation.findById(_id)
            if (!reclamation) {
                return res.status(404).send()
            }
            // if (req.user?.role === "ADMIN") {
            //     reclamation = await Reclamation.findById(_id)
            // } else {
            //     reclamation = await Reclamation.findOne({ _id, chauffeur: req.user._id })
            // }
            // if (!reclamation) {
            //     return res.status(404).send()
            // }
            res.send(reclamation)
        } catch (e) {
            res.status(500).send()
        }
    },
    updateReclamation: async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdatesArray = ['type', 'description', 'etat']
        const isValidOp = updates.every((update) => allowedUpdatesArray.includes(update))
        let reclamation
        if (!isValidOp) {
            return res.status(400).send({ error: 'INVALID UPDATES !' })
        }
        try {
            if (req.user?.role === "ADMIN") {
                reclamation = await Reclamation.findById(req.params.id)
            } else {
                reclamation = await Reclamation.findOne({ _id: req.params.id, chauffeur: req.user._id })
            }
            if (!reclamation) {
                return res.status(404).send()
            }
            updates.forEach((update) => reclamation[update] = req.body[update])
            await reclamation.save()
            res.send(reclamation)
        } catch (e) {
            res.status(400).send(e)
        }
    },
    deleteReclamation: async (req, res) => {
        const _id = req.params.id
        let reclamation
        try {
            if (req.user?.role === "ADMIN") {
                reclamation = await Reclamation.findByIdAndDelete(req.params.id)
            }else{
                reclamation = await Reclamation.findOneAndDelete({ _id, chauffeur: req.user._id })
            }
            if (!reclamation) {
                return res.status(404).send()
            }
            res.send(reclamation)
        } catch (e) {
            res.status(500).send(e)
        }
    },
}
