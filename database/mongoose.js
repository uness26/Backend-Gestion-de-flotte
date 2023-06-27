require('dotenv').config();
const mongoose = require('mongoose');
const URL = process.env.DB_URL

mongoose.connect(URL);
const database = mongoose.connection
database.on('error', (error) => {
    console.log('Connection to Database failed')
})
database.once('connected', () => {
    console.log('Database Connected');
})