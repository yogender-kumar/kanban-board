const mongoose = require('mongoose');
const config = require('./config');

const setupMongooseConnections = function() {
  mongoose.Promise = global.Promise;

  const options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };

  mongoose.connect(config.MONGO.MONGO_URL, options);

  mongoose.connection.on('connected', function() {
    console.log('Mongoose is now connected to ', config.MONGO.MONGO_URL);
  });

  mongoose.connection.on('error', function(err) {
    console.error('Error in Mongoose connection: ', err);
  });

  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose is now disconnected..!');
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose disconnected on process termination');
      process.exit(0);
    });
  });
}

module.exports = setupMongooseConnections;
