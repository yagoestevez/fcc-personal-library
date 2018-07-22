'use strict';

const express = require( 'express' );
const router  = express.Router();
const Library = require( './Controllers/Library' );

const ROOT    = '/';
const API     = '/api/books';
const library = new Library( );

// View main entrypoint.
router.get( ROOT, ( req,res ) => {
  library.getAllBooksJSON( res ).then( books => res.render( 'index', { books } ) )
} );

// API entrypoints.
router.get( API, ( req,res ) => library.getAllBooks( res ) );
router.get( `${API}/:id`, ( req,res ) => library.getBookByID( req.params.id, res ) );

router.post( API, ( req,res ) => library.addOneBook( req.body.title, res ) );
router.post( `${API}/:id`, ( req,res ) => {
  library.addBookReview( req.params.id, req.body.comment, res )
} );

router.delete( API, ( req,res ) => library.deleteAllBooks( res ) );
router.delete( `${API}/:id`, ( req,res ) => library.deleteBookByID( req.params.id, res ) );


module.exports = router;