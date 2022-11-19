const data = require("./session.json");

const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.postcategory = async (req, res) => {
    try {
        data.forEach(function (doc) {
            db.collection("Category").doc(doc["Track"]).set(
                {
                    imageUrl: "",
                    name: doc["Track"],
                });

        });
        return res.status(200).send({ "message": "Categories uploaded successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};