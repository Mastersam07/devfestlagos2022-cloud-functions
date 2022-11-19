const data = require("./session.json");
const speakers = require("./speakers.json");

const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.postsessions = async (req, res) => {
    try {
        data.forEach(function (doc) {
            speakers.forEach(function (speaker) {
                if (doc["Owner Email"] == speaker["Email"]) {
                    db.collection("Session").doc(doc["Session Id"].toString()).set(
                        {
                            sessionId: doc["Session Id"].toString(),
                            title: doc["Title"],
                            description: doc["Description"],
                            owner: doc["Owner"],
                            ownerEmail: doc["Owner Email"],
                            sessionFormat: doc["Session format"],
                            category: doc["Track"],
                            level: doc["Level"],
                            hall: doc["Room"],
                            scheduledAt: doc["Scheduled At"],
                            scheduledDuration: doc["Scheduled Duration"],
                            speakerImage: speaker["Profile Picture"],
                            tagLine: speaker["TagLine"],
                            order: data.indexOf(doc) + 1,
                        });
                } else {
                    console.log("Sope Otilor");
                }

            });

        });
        return res.status(200).send({ "message": "Sessions uploaded successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};