const { Server } = require("socket.io");
const admin = require('firebase-admin');
const serviceAccount = require("./config/serviceAccountKey.json")
const User = require('./models/user')
const Mission = require('./models/mission')



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

function socketManager(server) {

    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);

        socket.on("joinRoom", async (data) => {
            const { chauffeurID, matricule, fcm_token } = data
            socket.join(chauffeurID)
            const chauffeur = await User.findById(chauffeurID)
            chauffeur.fcmToken = fcm_token
            await chauffeur.save()
            console.log(`The driver ${matricule} joined his room : ${chauffeurID} `)

        })

        socket.on('addMission', async (missionData) => {
            const user = await User.findById(missionData.chauffeur)
            console.log(`New mission added for driver`, missionData);
            sendPushNotification(user.fcmToken, 'Notification', 'Vous avez une nouvelle mission')
        });

        socket.on('editEtat', async (data) => {
            const user = await User.findById(data.selectedReclamation.chauffeur._id)
            console.log(`une reclamation a changer d"etat`, data.newEtat);
            sendPushNotification(user.fcmToken, 'Notification', `une reclamation a changer d"etat  ${data.newEtat}`)
        })

        socket.on("addReclamation", (chauffeur) => {
            io.emit("addReclamation", JSON.stringify(chauffeur))
            console.log(`New reclamation added for driver ${chauffeur}`);
        })

        socket.on("missionBegin", async (data) =>{
            const mission = await Mission.findById(data)
            mission.etat = 'EN ROUTE'
            await mission.save()
            const heure = JSON.stringify(mission.heureDep)
            const date = JSON.stringify(mission.date)
            console.log(`La mission de ${date} à ${heure} à commencer`)
            io.emit("missionBegin", JSON.stringify(`La mission de ${date} à ${heure} à commencer`))
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
                priority: 'high'
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


}

module.exports = socketManager