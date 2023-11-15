const data = require("./akureSessions.json");

const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.postsessions = async (req, res) => {
    try {
        data.forEach(function (doc) {
            db.collection("Session").doc(data.indexOf(doc).toString()).set(
                {
                    sessionId: data.indexOf(doc).toString(),
                    title: doc["Title"],
                    description: doc["Description"],
                    owner: doc["Speakers"],
                    ownerEmail: doc["Owner Email"],
                    sessionFormat: doc["Session Type"],
                    category: doc["Category of Talk"],
                    level: doc["Target audience"],
                    hall: doc["Room"],
                    scheduledAt: doc["Time"],
                    scheduledDuration: doc["Scheduled Duration"] || "",
                    speakerImage: "", // TODO
                    tagLine: "", // TODO
                    order: data.indexOf(doc) + 1,
                });

        });
        return res.status(200).send({ "message": "Sessions uploaded successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};