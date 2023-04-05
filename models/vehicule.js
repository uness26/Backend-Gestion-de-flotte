const mongoose = require('mongoose')

const vehiculeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    marque: {
        type: String,
        required: true,
        trim: true
    },
    immatricule: {
        type: String,
        trim: true
    },
    volume: {
        type: String,
        trim: true
    }
})
vehiculeSchema.virtual('missions', {
    ref: 'Mission',
    localField: '_id',
    foreignField: 'vehicule'
})
const Vehicule = mongoose.model('Vehicule', vehiculeSchema)
module.exports = Vehicule