const util = require('../../util');
const Billing = require('../../models/Billing');

module.exports = (app, db) => {
  app.get('/api/billing/:id', (req, res) => {
    (async () => {
      const billingId = req.params.id;

      try {
        const document = db.collection('billings').doc(billingId);
        const doc = await document.get();
        const billing = new Billing(
          doc.data().id,
          doc.data().userId,
          doc.data().categoryId,
          doc.data().price,
          doc.data().description,
          doc.data().createdDate,
          doc.data().updatedDate
        );

        return util.apiResponse.success(res, billing);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}