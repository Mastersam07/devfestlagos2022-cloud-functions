const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.getQuestions = async (req, res) => {
    try {
        console.log(req.params.sessionId)
        console.log(req.params.email)
        let query = db.collection("Question");
        let response = [];
        if (req.params.sessionId) {
            await query.where("sessionId", "==", req.params.sessionId).get().then(snapshot => {
                let docs = snapshot.docs;
                for (let doc of docs) {
                    var data = doc.data();
                    const selectedItem = {
                        id: doc.id,
                        question: data.question,
                        answer: data.answer,
                        questioner: data.questioner,
                        sessionId: data.sessionId,
                    }
                    response.push(selectedItem);
                }
                return res.status(200).send(response);
            })
            return;
        }
        if (req.params.email) {
            await query.where("questioner", "==", req.params.email).get().then(snapshot => {
                let docs = snapshot.docs;
                for (let doc of docs) {
                    var data = doc.data();
                    const selectedItem = {
                        id: doc.id,
                        question: data.question,
                        answer: data.answer,
                        questioner: data.questioner,
                        sessionId: data.sessionId,
                    }
                    response.push(selectedItem);
                }
                return res.status(200).send(response);
            })
            return;
        }
        await query.get().then(snapshot => {
            let docs = snapshot.docs;
            for (let doc of docs) {
                var data = doc.data();
                const selectedItem = {
                    id: doc.id,
                    question: data.question,
                    answer: data.answer,
                    questioner: data.questioner,
                    sessionId: data.sessionId,
                }
                response.push(selectedItem);
            }
            return res.status(200).send(response);
        })

    } catch (error) {
        return res.status(500).send({ "message": "internal server error" });
    }
};

exports.askQuestion = async (req, res) => {
    try {
        db.collection("Question").add({
            question: req.body.question,
            questioner: req.body.email,
            sessionId: req.body.session_id,
            questionerName: req.body.name,
        });
        return res.status(200).send({ "message": "Question asked successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};
