//- Firebase
var functions = require('firebase-functions');
var admin = require('firebase-admin');
var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});
var db = admin.firestore();

//- Express
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors({ origin: true }));

//- Other
var moment = require('moment');

//- API
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});



exports.app = functions.https.onRequest(app);