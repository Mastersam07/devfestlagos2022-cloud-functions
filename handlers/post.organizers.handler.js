const data = require("./organizers.json");

const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.postorganizers = async (req, res) => {
    try {
        data.forEach(function (doc) {
            db.collection("Organizer").doc((data.indexOf(doc) + 1).toString()).set({
                avatar: doc["image"],
                name: doc["name"],
                title: doc["title"],
                organization: doc["company"],
                twitter: doc["twitter"],
            });

        });
        return res.status(200).send({ "message": "Organizers uploaded successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};