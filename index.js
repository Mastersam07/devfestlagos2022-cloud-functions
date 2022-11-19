const functions = require("firebase-functions");
const app = require("express")(); // Import and initialize express
const cors = require("cors");

app.use(cors({ origin: true }));

const { speakers } = require("./handlers/speakers.handler");
const { checkIn } = require("./handlers/checkin.handler");
const { categories } = require("./handlers/categories.handler");
const { halls } = require("./handlers/halls.handler");
const { organizers } = require("./handlers/organizers.handler");
const { sponsors } = require("./handlers/sponsors.handler");
const { postsponsor } = require("./handlers/post.sponsors.handler");
const { postspeakers } = require("./handlers/post.speakers.handler");
const { postsessions } = require("./handlers/post.session.handler");
const { postcategory } = require("./handlers/post.category.handler");
const { postorganizers } = require("./handlers/post.organizers.handler");


// Main Routes
app.get("/speakers", speakers);
app.get("/category", categories);
app.get("/venue", halls);
app.get("/team", organizers);
app.get("/sponsors", sponsors);
app.post("/postsponsors", postsponsor);
app.post("/postspeakers", postspeakers);
app.post("/postsessions", postsessions);
app.post("/postcategory", postcategory);
app.post("/postorganizers", postorganizers);
app.post("/checkin", checkIn);

exports.api = functions.https.onRequest(app);
