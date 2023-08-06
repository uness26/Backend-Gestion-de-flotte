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
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json")
const User = require('./models/user')



app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(vehiculeRouter)
app.use(reclamationRouter)
app.use(missionRouter)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("joinRoom", async (data) => {
    const {chauffeurID, matricule, fcm_token} = data
    socket.join(chauffeurID)
    const chauffeur = await User.findById(chauffeurID)
    chauffeur.fcmToken = fcm_token
    await chauffeur.save()
    console.log(`The driver ${matricule} joined his room : ${chauffeurID} ` )

  })

  socket.on('addMission', async (missionData) => {
    const user = await User.findById(missionData.chauffeur) 
    console.log(`New mission added for driver`, missionData);
    sendPushNotification(user.fcmToken, 'Notification', 'Vous avez une nouvelle mission')
  });

  socket.on('editEtat', async (data ) => {
    const user = await User.findById(missionData.chauffeur) 
    console.log(`une reclamation a changer d"etat`, data.newEtat);
    sendPushNotification(user.fcmToken, 'Notification', `une reclamation a changer d"etat  ${data.newEtat}`)
  })

  socket.on("addReclamation", (chauffeur) => {
    io.emit("addReclamation", JSON.stringify(chauffeur))
    console.log(`New reclamation added for driver ${chauffeur}`);
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id} Disconnected`);
  })
})


function sendPushNotification(fcmToken, title, body) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: fcmToken,
    android: {
      priority: 'high', // Set the priority to high for heads-up notification
    },
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log('Notification push envoyée avec succès :', response);
    })
    .catch((error) => {
      console.error('Erreur lors de l\'envoi de la notification push :', error);
    });
}


server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
})


