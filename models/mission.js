const mongoose = require('mongoose')

const missionSchema = new mongoose.Schema({
    date: {
        type:  String,
    },
    heureDep: {
        type: String,
    },
    heureArr : {
        type: String,
    },
    lieuDep: {
        type: String,
    },
    lieuArr: {
        type: String,
    },
    etat: {
        type: String,
        enum: ['EN ROUTE', 'TERMINEE'],
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