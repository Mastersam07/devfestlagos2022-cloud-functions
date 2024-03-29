const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.sessions = async (req, res) => {
    try {
        let query = db.collection("Session");
        let response = [];
        await query.get().then(snapshot => {
            let docs = snapshot.docs;
            for (let doc of docs) {
                var data = doc.data();
                const selectedItem = {
                    id: doc.id,
                    name: data.owner,
                    email: data.ownerEmail,
                    order: data.order,
                    hall: data.hall || 'General Hall',
                    category: data.category || 'General Session',
                    speakerImage: data.speakerImage,
                    duration: data.scheduledDuration,
                    description: data.description,
                    level: data.level,
                    title: data.title,
                    tagline: data.tagLine,

                }
                response.push(selectedItem);
            }
            return res.status(200).send(response);
        })
    } catch (error) {
        return res.status(500)(error);
    }
};
