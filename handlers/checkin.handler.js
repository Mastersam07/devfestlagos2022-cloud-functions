const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.checkIn = async (req, res) => {
    try {
        let userRef = db.collection("User");
        const doc = await userRef.doc(req.body.email).get();
        if (!doc.exists) {
            return res.status(404).send({ "message": "User did not register" });
        } else {
            await userRef.doc(req.body.email).update({
                checkedIn: true
            });
            const selectedItem = {
                id: doc.data().id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                email: doc.data().email,
                checkedIn: true,
            }
            return res.status(200).send({ "message": "User checked in successfully", "user": selectedItem });
        }
    } catch (error) {
        console.log(error);
        return res.status(500)(error);
    }
};




