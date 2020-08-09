const moment = require('moment');
const util = require('../../util');

module.exports = (app, db) => {
  app.put('/api/category/:id', (req, res) => {
    (async () => {
      const categoryId = req.params.id;
      const now = moment().unix();

      var postData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        updatedDate: now
      };

      try {
        const document = db.collection('categories').doc(categoryId);
        await document.update(postData);
  
        return util.apiResponse.success(res, postData);
      } catch (error) {
        console.log(error);
        return util.apiResponse.error(res);
      }
    })();
  });
}