const User = require('../models/user')

module.exports = {
    createUser: async (req, res) => {
        const user = new User(req.body)
        try {
            await user.save()
            res.status(201).send({ user })
        } catch (e) {
            res.status(400).send(e)
        }
    },
    signup: async (req, res) => {
        const user = new User(req.body)
        try {
            await user.save()
            res.status(201).send({ user })
        } catch (e) {
            res.status(400).send(e)
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (e) {
            res.status(400).send()
        }
    },
    logout: async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save()
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    },
    getUser: async (req, res) => {
        res.send(req.user)
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({})
            res.send(users)
        } catch (e) {
            res.status(500).send()
        }
    },
    getUserByID: async (req, res) => {
        const _id = req.params.id
        try {
            const user = await User.findById(_id)
            if (!user) {
                return res.status(404).send()
            }
            res.send(user)
        } catch (e) {
            res.status(500).send()
        }
    },
    updateUser: async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdatesArray = ['nom', 'prenom', 'email', 'password', 'CIN', 'tel', 'role']
        const isValidOp = updates.every((update) => allowedUpdatesArray.includes(update))
        if (!isValidOp) {
            return res.status(400).send({ error: 'INVALID UPDATES !' })
        }
        try {
            const user = await User.findById(req.params.id)
            updates.forEach((update) => user[update] = req.body[update])
            await user.save()
            if (!user) {
                return res.status(404).send()
            }
            res.send(user)
        } catch (e) {
            res.status(400).send(e)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            if (!user) {
                return res.status(404).send()
            }
            res.send(user)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
