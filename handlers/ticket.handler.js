const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.ticketConfirmer = async (req, res) => {
    try {
        let userRef = db.collection("User");
        const doc = await userRef.doc(req.body.email.toLowerCase()).get();
        if (!doc.exists) {
            return res.status(404).send({ "message": "User did not register", "error": "It seems this user did not register before the deadline." });
        } else {
            const selectedItem = {
                id: doc.data().id,
                email: doc.data().email.toLowerCase(),
            }
            return res.status(200).send({ "message": "User registered", "user": selectedItem });
        }
    } catch (error) {
        console.log(error);
        return res.status(500)({"message": "An error ocurred!", "error": error});
    }
};




