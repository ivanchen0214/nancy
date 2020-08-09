const util = require('../../util');

module.exports = (app, db) => {
  app.delete('/api/category/:id', (req, res) => {
    (async () => {
      const categoryId = req.params.id;

      try {
        const document = db.collection('categories').doc(categoryId);
        await document.delete();

        return util.apiResponse.success(res);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}