const firebaseKey = require('firebase-key');
const moment = require('moment');

const util = require('../../util');

module.exports = (app, db) => {
  app.post('/api/user/create', (req, res) => {
    (async () => {
      const id = firebaseKey.key();
      const now = moment().unix();

      const postData = {
        id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        createdDate: now,
        updatedDate: now
      };

      try {
        await db.collection('users').doc('/' + id + '/').create(postData);
        return util.apiResponse.success(res, postData);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}