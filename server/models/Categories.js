const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  }
});

const Categories = mongoose.model(
  'Categories',
  CategoriesSchema
);

// const accounts = require('../data');

// SocialMediaAccount.collection.insert(accounts, (err, data)=>{ (err)? console.log(err): console.log('data:', data.length);})


module.exports = Categories;
