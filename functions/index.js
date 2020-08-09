//- Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});
const db = admin.firestore();

//- Express
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

//- Other
const firebaseKey = require('firebase-key');
const _ = require('lodash');
const moment = require('moment');
const util = require('./util');

//--------------------------------------------------
//- API                                            -
//--------------------------------------------------
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});

//- Category
//- create
app.post('/api/category/create', (req, res) => {
  (async () => {
    const id = firebaseKey.key();
    const now = moment().unix();

    const postData = {
      id,
      title: req.body.title,
      description: req.body.description,
      status: true,
      createdDate: now,
      updatedDate: now
    };

    try {
      await db.collection('categories').doc('/' + id + '/').create(postData);
      return util.apiResponse.success(res, postData);
    } catch (error) {
      return util.apiResponse.error(res);
    }
  })();
});

//- read all
app.get('/api/category', (req, res) => {
  (async () => {
    try {
      let query = db.collection('categories');
      let response = [];

      await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;

        for (let doc of docs) {
          const category = {
            id: doc.data().id,
            title: doc.data().title,
            description: doc.data().description,
            status: doc.data().status,
            createdDate: doc.data().createdDate,
            updatedDate: doc.data().updatedDate
          };

          response.push(category);
        }
      });

      return util.apiResponse.success(res, response);
    } catch (error) {
      return util.apiResponse.error(res);
    }
  })();
});

//- read one
app.get('/api/category/:id', (req, res) => {
  (async () => {
    const categoryId = req.params.id;

    try {
      const document = db.collection('categories').doc(categoryId);
      let category = await document.get();
      let response = category.data();

      return util.apiResponse.success(res, response);
    } catch (error) {
      return util.apiResponse.error(res);
    }
  })();
});

//- update
app.put('/api/category/:id', (req, res) => {
  (async () => {
    const categoryId = req.params.id;
    const now = moment().unix();

    var postData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      updatedDate: now
    };

    try {
      const document = db.collection('categories').doc(categoryId);
      await document.update(postData);

      return util.apiResponse.success(res, postData);
    } catch (error) {
      console.log(error);
      return util.apiResponse.error(res);
    }
  })();
});

// delete
app.delete('/api/category/:id', (req, res) => {
  (async () => {
    const categoryId = req.params.id;

    try {
      const document = db.collection('categories').doc(categoryId);
      await document.delete();

      return util.apiResponse.success(res);
    } catch (error) {
      return util.apiResponse.error(res);
    }
  })();
});

exports.app = functions.https.onRequest(app);