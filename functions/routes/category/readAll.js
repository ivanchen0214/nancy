const util = require('../../util');
const Category = require('../../models/Category');

module.exports = (app, db) => {
  app.get('/api/category', (req, res) => {
    (async () => {
      try {
        const query = db.collection('categories');
        let response = [];

        await query.get().then(querySnapshot => {
          const docs = querySnapshot.docs;

          for (let doc of docs) {
            const category = new Category(
              doc.data().id,
              doc.data().title,
              doc.data().description,
              doc.data().status,
              doc.data().createdDate,
              doc.data().updatedDate
            );

            response.push(category);
          }
        });

        return util.apiResponse.success(res, response);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}