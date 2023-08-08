const mongoose = require('mongoose')


const missionSchema = new mongoose.Schema({
    date: {
        required: true,
        type: String,
    },
    heureDep: {
        required: true,
        type: String,
    },
    heureArr: {
        type: String,
    },
    lieuDep: {
        required: true,
        type: String,
    },
    lieuArr: {
        type: String,
        required: true
    },
    etat: {
        type: String,
        enum: ['EN ROUTE', 'TERMINEE'],
    },
    chauffeur: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    vehicule: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicule',
    }
},
    {
        timestamps: true
    })


missionSchema.pre('save', async function (next) {
    if (this.isModified('date')) {
        this.date = await new Date(this.date).toLocaleString('fr-FR', { dateStyle: 'short' });
    }
    if (this.isModified('heureDep')) {
        this.heureDep = await new Date(this.heureDep).toLocaleString('fr-FR', { timeStyle: 'short' })
    }
    if (this.isModified('heureArr')) {
        this.heureArr = await new Date(this.heureArr).toLocaleString('fr-FR', { timeStyle: 'short' })
    }
    next();
});

const Mission = mongoose.model('Mission', missionSchema)
module.exports = Mission

