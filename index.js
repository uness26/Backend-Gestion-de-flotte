const express = require('express')
require('./database/mongoose')
const cors = require('cors')
const userRouter = require('./routers/user')
const vehiculeRouter = require('./routers/vehicule')
const reclamationRouter = require('./routers/reclamation')
const missionRouter = require('./routers/mission')


const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(vehiculeRouter)
app.use(reclamationRouter)
app.use(missionRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


