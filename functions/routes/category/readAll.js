const util = require('../../util');

module.exports = (app, db) => {
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
}