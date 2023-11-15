const data = require("./attendees.json");

const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.postattendee = async (req, res) => {
    try {
        data.forEach(function (doc) {
            db.collection("User").doc(doc["Email"].toLowerCase()).set({
                email: doc["Email"].toLowerCase(),
                checkedIn: false
            });

        });
        return res.status(200).send({ "message": "Attendees uploaded successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};