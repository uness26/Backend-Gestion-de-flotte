const mongoose = require('mongoose')

const reclamationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date()
    },
    description: {
        type: String,
        required: true,
    },
    etat: {
        type: String,
        enum: ['EN COURS', 'ANNULLEE', 'TRAITEE'],
        default: 'EN COURS',
        required: true
    },
    chauffeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})
const Reclamation = mongoose.model('Reclamation', reclamationSchema)
module.exports = Reclamation
