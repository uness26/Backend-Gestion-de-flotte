const mongoose = require('mongoose')

const missionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date(),
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

    },
    vehicule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicule',
        
    }
})
const Mission = mongoose.model('Mission', missionSchema)
module.exports = Mission