const fs = require('fs');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});
const db = admin.firestore();

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

//- routes
fs.readdirSync('routes').forEach(function (file) {
  const path = './routes/' + file + '/index.js';
  require(path)(app, db);
});

exports.app = functions.https.onRequest(app);