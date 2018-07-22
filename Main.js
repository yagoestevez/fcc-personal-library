'use strict';

const express     = require( 'express' );
const cors        = require( 'cors' );
const helmet      = require( 'helmet' );
const pug         = require( 'pug' );
require( 'dotenv' ).config( );

const routes      = require( './App/routes' );
const fccTesting  = require( './Testing/FCC/fcctesting' );
const runner      = require( './Testing/FCC/test-runner' );

const app  = express( );
const PORT = process.env.PORT || 3000;

app.set( 'view engine', 'pug' );
app.set( 'views', './App/Views' );
app.use( '/assets', express.static( 'App/Views/Assets' ) );
app.use( cors( { origin: '*' } ) ); //For FCC testing purposes only
app.use( express.urlencoded( { extended: true } ) );
app.use( helmet( {
  noCache       : true,
  hidePoweredBy : { setTo: 'PHP 4.2.0' },
  xssFilter     : true,
} ) );

fccTesting( app ); // For FCC testing purposes.

// Router
app.use( routes );

// 404 Not Found Middleware.
app.use( ( req,res,next ) => {
  res.status( 404 )
    .type( 'text' )
    .send( 'Not Found' );
} );

// Start the server and testing suite.
app.listen( PORT, ( ) => {
  const GREEN_BG = '\x1b[42m\x1b[30m';
  const RED_TEXT = '\x1b[31m';
  const RESET    = '\x1b[0m'; 
  console.log( `${GREEN_BG}%s${RESET}`, ` :: Listening on port ${PORT} :: ` );
  if ( process.env.NODE_ENV === 'test' ) {
    console.log( `${RED_TEXT}%s${RESET}`, `------> Running Tests ------->` );
    setTimeout( ( ) => {
      try            { runner.run( ); }
      catch( error ) { console.log( `Tests are not valid:\n ${error}` ); }
    }, 1500 );
  }
} );

module.exports = app; // For testing.