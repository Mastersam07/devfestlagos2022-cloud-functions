const admin = require("firebase-admin");

const serviceAccount = require("../config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


// admin.initializeApp();
const db = admin.firestore();

module.exports = {admin, db};
