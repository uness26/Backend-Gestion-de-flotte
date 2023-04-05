const mongoose = require('mongoose')

const missionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date(),
        required: true
    },
    lieuDep: {
        type: String,
        required: true
    },
    lieuArr: {
        type: String,
        required: true
    },
    etat: {
        type: String,
    },
    chauffeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicule',
        required: true
    }
})
const Mission = mongoose.model('Mission', missionSchema)
module.exports = Mission