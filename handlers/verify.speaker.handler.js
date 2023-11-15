const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.verifyspeaker = async (req, res) => {
    try {
        let sessions = db.collection("Session");
        let speakers = db.collection("Speaker");
        let responseQuestions = [];

        if(!req.body.email){
            return res.status(400).send({ "message": "An error ocurred!", "error": "Please provide the email address" });
        }

        // CHECK IF SPEAKER
        const doc = await speakers.doc(req.body.email.toLowerCase()).get();
        if (!doc.exists) {
            return res.status(200).send({ "isSpeaker":false});
        } else {

            // CHECK QUESTIONS

            const sdocs = await sessions.where("ownerEmail", "==", req.body.email.toLowerCase()).get();

            // CHECK QUESTIONS
            let questions = db.collection("Question");

            const qdocs = await questions.where("sessionId", "==", sdocs.docs[0].id).get();

            for (let qdoc of qdocs.docs) {
                var data = qdoc.data();
                const selectedQuestion = {
                    id: qdoc.id,
                    question: data.question,
                    answer: data.answer,
                    questioner: data.questioner,
                    sessionId: data.sessionId,
                    questionerName: data.questionerName,
                }
                responseQuestions.push(selectedQuestion);
            }

            const speakerResponse = {
                isSpeaker: true,
                hall: sdocs.docs[0].data().hall || "",
                time: sdocs.docs[0].data().scheduledAt || "",
                interestedAttendees: sdocs.docs[0].data().interestedAttendees || [],
                questions: responseQuestions || [],
            }

            return res.status(200).send(speakerResponse);
        }
    } catch (error) {
        return res.status(500)({"message": "An error ocurred!", "error": error});
    }
};




