var express = require('express');

const routes = Platforms => {
  const router = express.Router();

  router.route('/').get((req, res) => {
    Platforms.find(function(err, platforms) {
      if (err) res.send(err);
      else res.json(platforms);
    });
  });
  return router;
};

module.exports = routes;
