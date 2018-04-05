var express = require('express');

const routes = SocialMediaAccount => {
  const router = express.Router();

  router
    .route('/')
    .get((req, res) => {
      SocialMediaAccount.find(function(err, accounts) {
        if (err) res.send(err);
        else res.json(accounts);
      });
    })
    .post((req, res) => {
      const socialMediaAccount = new SocialMediaAccount();

      // Set the properties that came from the POST data
      socialMediaAccount.name = req.body.name;
      socialMediaAccount.networks = req.body.networks;
      socialMediaAccount.categories = req.body.categories;

      // Save the socialMediaAccount and check for errors
      socialMediaAccount.save(function(err) {
        err
          ? res.send(err)
          : res.json({ message: 'Item added!', data: socialMediaAccount });
      });
    });

  router.use('/:account_id', (req, res, next) => {
    SocialMediaAccount.findById(req.params.account_id, (err, account) => {
      if (err) {
        res.status(500).send(err);
      } else if (account) {
        req.account = account;
        next();
      } else {
        res.status(404).send('no account found');
      }
    });
  });
  router
    .route('/:account_id')
    .get((req, res) => {
      res.json(req.account);
    })
    .put((req, res) => {
      req.account.name = req.body.name;
      req.account.networks = req.body.networks;
      req.account.categories = req.body.categories;
      req.account.save(function(err) {
        if (err) res.send(err);
        else res.json(req.account);
      });
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id;
      }
      for (let p in req.body) {
        req.account[p] = req.body[p];
      }
      req.account.save(err => {
        if (err) res.status(500).send(err);
        else res.json(req.account);
      });
    })
    .delete((req, res) => {
      req.account.remove(err => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('removed');
        }
      });
    });
  return router;
};

module.exports = routes;
