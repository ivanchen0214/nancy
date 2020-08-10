const moment = require('moment');
const util = require('../../util');

module.exports = (app, db) => {
  app.put('/api/user/:id', (req, res) => {
    (async () => {
      const userId = req.params.id;
      const now = moment().unix();

      var postData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        updatedDate: now
      };

      try {
        const document = db.collection('users').doc(userId);
        await document.update(postData);

        return util.apiResponse.success(res, postData);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}