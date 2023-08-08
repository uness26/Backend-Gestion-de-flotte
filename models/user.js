const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Role = require('./role')

const userSchema = new mongoose.Schema({
    matricule: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nom: {
        type: String,
        required: true,
        trim: true
    },
    prenom: {
        type: String,
        required: true,
        trim: true
    },
    CIN: {
        type: String,
        required: true,
        },
    
    tel: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        required: true,
        type: String,
        trim: true,
        minLength: 7,
    },
    role: {
        type: String,
        enum: [Role.ADMIN, Role.CHAUFFEUR],
    },
    token: {
        type: String,
    },
    fcmToken: {
        type: String
    }
})

userSchema.virtual('reclamations', {
    ref: 'Reclamation',
    localField: '_id',
    foreignField: 'chauffeur'
})
userSchema.virtual('missions', {
    ref: 'Mission',
    localField: '_id',
    foreignField: 'chauffeur'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.token
    delete userObject.fcmToken
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY)
    user.token = token
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Email Incorrect')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Password Incorrect')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User