const mongoose = require('mongoose')

const reclamationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Retard', 'Incident', 'Abcense', 'Autres'],
        required: true,
    },
    date: {
        type: String,
        default: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
    },
    description: {
        type: String,
        required: true,
    },
    etat: {
        type: String,
        enum: ['En cour', 'Annulée', 'Traitée'],
    },
    chauffeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},
    {
        timestamps: true
    }
)
const Reclamation = mongoose.model('Reclamation', reclamationSchema)
module.exports = Reclamation
