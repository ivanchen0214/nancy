const util = require('../../util');
const User = require('../../models/User');

module.exports = (app, db) => {
  app.get('/api/user', (req, res) => {
    (async () => {
      try {
        const query = db.collection('users');
        let response = [];

        await query.get().then(querySnapshot => {
          const docs = querySnapshot.docs;

          for (let doc of docs) {
            const user = new User(
              doc.data().id,
              doc.data().firstName,
              doc.data().lastName,
              doc.data().createdDate,
              doc.data().updatedDate
            );

            response.push(user);
          }
        });

        return util.apiResponse.success(res, response);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}