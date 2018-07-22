'use strict';

const mongoose   = require( 'mongoose' );

const DB_URI     = process.env.DB;

module.exports = class DB {
  connect ( ) {
    return mongoose.connect( DB_URI, { useNewUrlParser: true } )
      .catch( error => console.log( error.message ) );
  }
}