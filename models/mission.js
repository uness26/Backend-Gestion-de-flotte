const mongoose = require('mongoose')


const missionSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    heureDep: {
        type: String,
    },
    heureArr: {
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
    
},
{
    timestamps : true
})


missionSchema.pre('save', async function (next) {
    if (this.isModified('date')) {
        this.date = new Date(this.date).toLocaleString('fr-FR', { dateStyle: 'short' });
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

