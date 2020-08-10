const util = require('../../util');

module.exports = (app, db) => {
  app.delete('/api/user/:id', (req, res) => {
    (async () => {
      const userId = req.params.id;

      try {
        const document = db.collection('users').doc(userId);
        await document.delete();

        return util.apiResponse.success(res);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}