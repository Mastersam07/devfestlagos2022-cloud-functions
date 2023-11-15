const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.checkIn = async (req, res) => {
    try {
        let userRef = db.collection("User");
        // const today = new Date();
        // const eventDay = new Date('2022-11-26');
        // if (
        //     !(today.getFullYear() === eventDay.getFullYear() &&
        //     today.getMonth() === eventDay.getMonth() &&
        //     today.getDay() === eventDay.getDay())
        //   ) {
        //     return res.status(400).send({ "message": "Today isn't devfest", "error": "Calma. Don't be in a hurry. Check in can only been done on event day. Thank you." });
        //   }
        if(!req.body.email){
            return res.status(400).send({ "message": "An error ocurred!", "error": "Please login to scan" });
        }
        const doc = await userRef.doc(req.body.email.toLowerCase()).get();
        if (!doc.exists) {
            return res.status(404).send({ "message": "User did not register", "error": "It seems you did not register before the deadline. Please speak with any volunteer for assistance. Thank you." });
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
        return res.status(500).send({ "message": "An error ocurred!", "error": "An error ocurred. Please try again later" });
    }
};




