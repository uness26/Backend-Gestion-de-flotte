require('./database/mongoose')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRouter = require('./routers/user')
const vehiculeRouter = require('./routers/vehicule')
const reclamationRouter = require('./routers/reclamation')
const missionRouter = require('./routers/mission')
const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(vehiculeRouter)
app.use(reclamationRouter)
app.use(missionRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


