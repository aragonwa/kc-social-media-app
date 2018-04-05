var express = require('express');

const routes = Categories => {
  const router = express.Router();

  router.route('/').get((req, res) => {
    Categories.find(function(err, categories) {
      if (err) res.send(err);
      else res.json(categories);
    });
  });
  return router;
};

module.exports = routes;
