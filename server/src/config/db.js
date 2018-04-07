/* eslint-disable no-console */

import Constants from './constants';

import mongoose from 'mongoose';

try {
  mongoose.Promise = global.Promise;
  mongoose.set('debug', Constants.DEBUG_MODE);
  mongoose.connect(Constants.DB_URL, {
    useMongoClient: true,
  });
} catch (err) {
  mongoose.createConnection(Constants.DB_URL, {
    useMongoClient: true,
  });
}

// Start mongodb connection
mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e;
  });
