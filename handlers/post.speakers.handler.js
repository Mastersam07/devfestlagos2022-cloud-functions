const data = require("./speakers.json");

const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.postspeakers = async (req, res) => {
    try {
        data.forEach(function (doc) {
            db.collection("Speaker").doc(doc["Email"]).set({
                avatar: doc["Profile Picture"],
                bio: doc["Bio"],
                name: doc["FirstName"] + " " + doc["LastName"],
                email: doc["Email"],
                organization: doc["TagLine"],
                role: doc["TagLine"],
                github: doc["GitHub Handle"],
                twitter: doc["Twitter"],
                linkedIn: doc["LinkedIn"],
                order: data.indexOf(doc) + 1,
            });

        });
        return res.status(200).send({ "message": "Speakers uploaded successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};