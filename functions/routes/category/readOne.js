const util = require('../../util');

module.exports = (app, db) => {
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
}