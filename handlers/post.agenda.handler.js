const data = require("./agendaAkure.json");

const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.postagenda = async (req, res) => {
    try {
        data.forEach(function (doc) {
            db.collection("Agenda").doc((data.indexOf(doc) + 1).toString()).set({
                schedule: doc["Event"],
                time: doc["Time"],
                facilitator: doc["Facilitator"],
                order: data.indexOf(doc) + 1,
                isbreakout: doc["isbreakout"] || false,
                hall: doc["Hall"]
            });

        });
        return res.status(200).send({ "message": "Agenda uploaded successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};