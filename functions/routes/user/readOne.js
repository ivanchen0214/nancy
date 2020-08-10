const util = require('../../util');
const User = require('../../models/User');

module.exports = (app, db) => {
  app.get('/api/user/:id', (req, res) => {
    (async () => {
      const userId = req.params.id;

      try {
        const document = db.collection('users').doc(userId);
        const doc = await document.get();
        const user = new User(
          doc.data().id,
          doc.data().firstName,
          doc.data().lastName,
          doc.data().createdDate,
          doc.data().updatedDate
        );

        return util.apiResponse.success(res, user);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}