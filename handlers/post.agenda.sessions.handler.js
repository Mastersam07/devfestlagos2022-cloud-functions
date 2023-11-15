const session1 = require("./newsession1.json");
const session2 = require("./newsession2.json");
const session3 = require("./newsession3.json");
const session4 = require("./newsession4.json");

const functions = require("firebase-functions");
const { db } = require("../util/admin");

exports.postagendasession = async (req, res) => {
    try {
        db.collection("Agenda").doc("21").update({
            sessions: session1.map(session => ({ schedule: session["Schedule"], venue: session["Time"], facilitator: session["Speaker/Facilitator"], time: session1[0]["Time"] }))
        });

        db.collection("Agenda").doc("24").update({
            sessions: session2.map(session => ({ schedule: session["Schedule"], venue: session["Time"], facilitator: session["Speaker/Facilitator"], time: session2[0]["Time"]  }))
        });

        db.collection("Agenda").doc("26").update({
            sessions: session3.map(session => ({ schedule: session["Schedule"], venue: session["Time"], facilitator: session["Speaker/Facilitator"], time: session3[0]["Time"]  }))
        });

        db.collection("Agenda").doc("28").update({
            sessions: session4.map(session => ({ schedule: session["Schedule"], venue: session["Time"], facilitator: session["Speaker/Facilitator"], time: session4[0]["Time"]  }))
        });

        return res.status(200).send({ "message": "Breakup sessions updated successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};

