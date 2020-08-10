const moment = require('moment');
const util = require('../../util');

module.exports = (app, db) => {
  app.put('/api/billing/:id', (req, res) => {
    (async () => {
      const billingId = req.params.id;
      const now = moment().unix();

      var postData = {
        categoryId: req.body.categoryId,
        price: req.body.price,
        description: req.body.description,
        updatedDate: now
      };

      try {
        const document = db.collection('billings').doc(billingId);
        await document.update(postData);

        return util.apiResponse.success(res, postData);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}