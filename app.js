require('./database/mongoose')
const express = require('express')
const cors = require('cors')
const userRouter = require('./routers/user')
const vehiculeRouter = require('./routers/vehicule')
const reclamationRouter = require('./routers/reclamation')
const missionRouter = require('./routers/mission')
const app = express()



app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(vehiculeRouter)
app.use(reclamationRouter)
app.use(missionRouter)

module.exports = app





