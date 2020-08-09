const util = require('../../util');
const Category = require('../../models/Category');

module.exports = (app, db) => {
  app.get('/api/category/:id', (req, res) => {
    (async () => {
      const categoryId = req.params.id;

      try {
        const document = db.collection('categories').doc(categoryId);
        const doc = await document.get();
        const category = new Category(
          doc.data().id,
          doc.data().title,
          doc.data().description,
          doc.data().status,
          doc.data().createdDate,
          doc.data().updatedDate
        );

        return util.apiResponse.success(res, category);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}