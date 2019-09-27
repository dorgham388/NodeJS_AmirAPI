const deleteRoutes = require('./delete')
const getRoutes = require('./get')
const patchRoutes = require('./patch')
const postRoutes = require('./post')

const initializeRoutes = app => {
  deleteRoutes(app);
  getRoutes(app);
  patchRoutes(app);
  postRoutes(app);
};
module.exports = initializeRoutes;
