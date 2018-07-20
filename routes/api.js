'use strict';

const MongoClient = require( 'mongodb' );
const ObjectId    = require( 'mongodb' ).ObjectID;
const xssFilters  = require( 'xss-filters' );

const DB_URI      = process.env.DB;
const ENDPOINT    = '/api/books';

module.exports = ( app ) => {

  app.get( ENDPOINT, ( req,res ) => {
    //response will be array of book objects
    //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
  } );

  app.post( ENDPOINT, ( req,res ) => {
    const title = req.body.title;
    //response will contain new book object including atleast _id and title
  } );

  app.delete( ENDPOINT, ( req,res ) => {
    //if successful response will be 'complete delete successful'
  } );

  app.get( `${ENDPOINT}/:id`, ( req,res ) => {
    const bookid = req.params.id;
    //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
  } );

  app.post( `${ENDPOINT}/:id`, ( req,res ) => {
    const bookid = req.params.id;
    const comment = req.body.comment;
    //json res format same as .get
  } );

  app.delete( `${ENDPOINT}/:id`, ( req,res ) => {
    const bookid = req.params.id;
    //if successful response will be 'delete successful'
  } );

}