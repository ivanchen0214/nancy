const util = require('../../util');

module.exports = (app, db) => {
  app.delete('/api/billing/:id', (req, res) => {
    (async () => {
      const billingId = req.params.id;

      try {
        const document = db.collection('billings').doc(billingId);
        await document.delete();

        return util.apiResponse.success(res);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}