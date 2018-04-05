const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const PlatformsSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
});

const socialMediaAccountSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  platforms: {
    type: [PlatformsSchema],
    required: true
  },
  categories: [String]
});

const SocialMediaAccount = mongoose.model(
  'SocialMediaAccount',
  socialMediaAccountSchema
);

// const accounts = require('../data');

// SocialMediaAccount.collection.insert(accounts, (err, data)=>{ (err)? console.log(err): console.log('data:', data.length);})


module.exports = SocialMediaAccount;
