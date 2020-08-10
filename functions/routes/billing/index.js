const create = require('./create');
const readAll = require('./readAll');
const readOne = require('./readOne');
const update = require('./update');
const remove = require('./remove');

module.exports = (app, db) => {
  create(app, db);
  readAll(app, db);
  readOne(app, db);
  update(app, db);
  remove(app, db);
}
