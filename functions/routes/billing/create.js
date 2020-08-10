const firebaseKey = require('firebase-key');
const moment = require('moment');

const util = require('../../util');

module.exports = (app, db) => {
  app.post('/api/billing/create', (req, res) => {
    (async () => {
      const id = firebaseKey.key();
      const now = moment().unix();

      const postData = {
        id,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
        price: req.body.price,
        description: req.body.description,
        createdDate: now,
        updatedDate: now
      };

      try {
        await db.collection('billings').doc('/' + id + '/').create(postData);
        return util.apiResponse.success(res, postData);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}