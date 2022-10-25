const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.organizers = async (req, res) => {
    try {
        let query = db.collection("Organizer");
        let response = [];
        await query.get().then(snapshot => {
            let docs = snapshot.docs;
            for (let doc of docs) {
                var data = doc.data();
                const selectedItem = {
                    id: doc.id,
                    name: data.name,
                    role: data.role,
                    avatar: data.avatar,
                    twitter_url: data.twitter,
                    organization: data.organization
                }
                response.push(selectedItem);
            }
            return res.status(200).send(response);
        })
    } catch (error) {
        return res.status(500)(error);
    }
};
