require('dotenv').config();
require('dotenv').load();
var mongoose = require('mongoose');

// Use different database URIs based on whether an env var exists.
var dbUri = process.env.PROD_MONGO || 'mongodb://localhost/gecko-bot';

if (!process.env.PROD_MONGO) {
  // check that MongoD is running...
  require('net').connect(27017, 'localhost').on('error', function() {
    console.log("YOU MUST BOW BEFORE THE MONGOD FIRST, MORTAL!");
    process.exit(0);
  });
}

if (!mongoose.connection._hasOpened) {
  mongoose.connect(dbUri);
  console.log('db connected to node project: gecko-bot');
};

module.exports = mongoose;
