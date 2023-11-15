const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.agenda = async (req, res) => {
    try {
        let query = db.collection("Agenda");
        let response = [];
        await query.get().then(snapshot => {
            let docs = snapshot.docs;
            for (let doc of docs) {
                var data = doc.data();
                const selectedItem = {
                    id: doc.id,
                    duration: data.duration,
                    facilitator: data.facilitator,
                    order: data.order,
                    isBreakout: data.isbreakout,
                    title: data.schedule,
                    time: data.time,
                    sessions: data.sessions || [],
                    hall: data.hall
                }
                response.push(selectedItem);
            }
            return res.status(200).send(response);
        })
    } catch (error) {
        return res.status(500)(error);
    }
};
