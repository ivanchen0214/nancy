const util = require('../../util');
const Billing = require('../../models/Billing');

module.exports = (app, db) => {
  app.get('/api/billing', (req, res) => {
    (async () => {
      try {
        const query = db.collection('billings');
        let response = [];

        await query.get().then(querySnapshot => {
          const docs = querySnapshot.docs;

          for (let doc of docs) {
            const billing = new Billing(
              doc.data().id,
              doc.data().userId,
              doc.data().categoryId,
              doc.data().price,
              doc.data().description,
              doc.data().createdDate,
              doc.data().updatedDate
            );

            response.push(billing);
          }
        });

        return util.apiResponse.success(res, response);
      } catch (error) {
        return util.apiResponse.error(res);
      }
    })();
  });
}