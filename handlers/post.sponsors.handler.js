const data = require("./data.json");

const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.postsponsor = async (req, res) => {
    try {
        data.forEach(function (doc) {
            db.collection("Sponsor").doc(doc["Company Name"]).set({
                description: doc["Company description"],
                logoUrl: doc["Company logo"],
                name: doc["Company Name"],
                twitterHandle: doc["Organisation twitter handle?"],
                website: doc["Website"],
                order: data.indexOf(doc) + 1
            });

        });
        return res.status(200).send({ "message": "Sponsors uploaded successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};