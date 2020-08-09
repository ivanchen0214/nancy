const firebaseKey = require('firebase-key');
const moment = require('moment');

const util = require('../../util');

module.exports = (app, db) => {
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
}