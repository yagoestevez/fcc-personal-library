'use strict';

const DB        = require( '../Controllers/DB' );
const Bookshelf = require( '../Models/Bookshelf' );

module.exports = class Library {

  constructor ( ) {
    new DB( ).connect( );
    this.bookshelf = new Bookshelf( );
  }

  // For the UI.
  async getAllBooksJSON ( res ) {
    const output = await this.bookshelf.getAllBooks( )
      .then( booksDocs => booksDocs.map( doc => {
          return { title : doc.title, _id : doc._id, comments : doc.comments }
        } )
      )
      .catch( error => res.send( `ERROR:\n ${ error }` ) );
    return output;
  }

  // For the API.
  getAllBooks ( res ) {
    this.bookshelf.getAllBooks( )
      .then( booksDocs => {
        booksDocs = booksDocs.map( doc => {
          return {
            title        : doc.title,
            _id          : doc._id,
            commentcount : doc.comments.length
          }
        } );
        res.json( booksDocs );
      } )
      .catch( error => res.send( `ERROR:\n ${ error }` ) );
  };

  getBookByID ( id, res ) {
    this.bookshelf.getBookByID( id )
      .then( bookDoc => {
        res.json( {
          title        : bookDoc.title,
          _id          : bookDoc._id,
          comments     : bookDoc.comments
        } );
      } )
      .catch( error => res.send( 'no book exists' ) );
  };

  addOneBook ( title, res ) {
    this.bookshelf.storeOneBook( title )
      .then( bookDoc => {
        res.json( {
          title : bookDoc.title,
          _id   : bookDoc._id,
        } );
      } )
      .catch( error => res.send( 'every book should have a name' ) );
  };

  addBookReview ( id, comment, res ) {
    if ( !comment || comment === '' )
      return res.send( 'no empty comments' );
    this.bookshelf.storeBookReview( id, comment )
      .then( bookDoc => {
        res.json( {
          title        : bookDoc.title,
          _id          : bookDoc._id,
          comments     : bookDoc.comments
        } );
      } )
      .catch( error => res.send( 'no book exists' ) );
  };

  deleteBookByID ( id, res ) {
    this.bookshelf.removeBookByID( id )
      .then( bookDoc => {
        res.send( bookDoc ? 'delete successful' : 'no book exists' )
      } )
      .catch( error => res.send( `ERROR:\n ${ error }` ) );
  };

  deleteAllBooks ( res ) {
    this.bookshelf.removeAllBooks( )
      .then( bookDoc => res.send( 'complete delete successful' ) )
      .catch( error => res.send( `ERROR:\n ${ error }` ) );
  }

};