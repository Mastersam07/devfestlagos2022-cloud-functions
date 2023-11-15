const data = require("./contributors.json");

const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.postcontributors = async (req, res) => {
    try {
        data.forEach(function (doc) {
            doc["order"] = data.indexOf(doc);
            db.collection("Contributor").doc(doc["name"]).set(doc);

        });
        return res.status(200).send({ "message": "Contributors uploaded successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};