const functions = require("firebase-functions");
const app = require("express")(); // Import and initialize express
const cors = require("cors");

app.use(cors({ origin: true }));

const { speakers } = require("./handlers/speakers.handler");
const { checkIn } = require("./handlers/checkin.handler");
const { ticketConfirmer } = require("./handlers/ticket.handler");
const { categories } = require("./handlers/categories.handler");
const { halls } = require("./handlers/halls.handler");
const { organizers } = require("./handlers/organizers.handler");
const { sponsors } = require("./handlers/sponsors.handler");
const { sessions } = require("./handlers/sessions.handler");
const { agenda } = require("./handlers/agenda.handler");
const { postsponsor } = require("./handlers/post.sponsors.handler");
const { postspeakers } = require("./handlers/post.speakers.handler");
const { postsessions } = require("./handlers/post.session.handler");
const { postcategory } = require("./handlers/post.category.handler");
const { postorganizers } = require("./handlers/post.organizers.handler");
const { postcontributors } = require("./handlers/post.contributors.handler");
const { postagenda } = require("./handlers/post.agenda.handler");
const { postagendasession } = require("./handlers/post.agenda.sessions.handler");
const { postattendee } = require("./handlers/post.attendees.handler");
const { getQuestions, askQuestion } = require("./handlers/questions.handler");
const { verifyspeaker } = require("./handlers/verify.speaker.handler");


// Main Routes

// GET
app.get("/speakers", speakers);
app.get("/category", categories);
app.get("/venue", halls);
app.get("/team", organizers);
app.get("/sponsors", sponsors);
app.get("/sessions", sessions);
app.get("/agenda", agenda);

// POST
app.post("/postsponsors", postsponsor);
app.post("/postspeakers", postspeakers);
app.post("/postsessions", postsessions);
app.post("/postcategory", postcategory);
app.post("/postorganizers", postorganizers);
app.post("/postcontributors", postcontributors);
app.post("/postagenda", postagenda);
app.post("/postagendasession", postagendasession);
app.post("/checkin", checkIn);
app.post("/ticket-confirmer", ticketConfirmer);
app.post("/postattendee", postattendee);
app.post("/speakers", verifyspeaker);

app.get("/questions/:email", getQuestions);
app.get("/questions", getQuestions);
app.post("/questions", askQuestion);
// UPDATE QUESTIONS
// app.put("/questions", askQuestion);
// DELETE QUESTIONS
// app.delete("/questions", askQuestion);

exports.api = functions.https.onRequest(app);
