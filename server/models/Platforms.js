const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const PlatformsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  }
});

const Platforms = mongoose.model(
  'Platforms',
  PlatformsSchema
);

// const accounts = require('../data');

// SocialMediaAccount.collection.insert(accounts, (err, data)=>{ (err)? console.log(err): console.log('data:', data.length);})


module.exports = Platforms;
