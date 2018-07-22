const chaiHttp  = require( 'chai-http' );
const chai      = require( 'chai' );
const expect    = chai.expect;
const server    = require( '../Main' );

chai.use( chaiHttp );

const ENDPOINT = '/api/books';

suite( 'Functional Tests', ( ) => {

  let firstInsertedID; // Used to store the first inserted ID and use it later in the PUT tests.

  test( '#example Test GET /api/books', done => {
     chai.request( server )
      .get( ENDPOINT )
      .end( ( err,res ) => {
        expect( res.status ).to.equal( 200 );
        expect( res.body, 'response should be an array' )
                .to.be.an( 'array' );
        expect( res.body[0], 'Books in array should contain commentcount' )
                .to.have.property( 'commentcount' );
        expect( res.body[0], 'Books in array should contain title' )
                .to.have.property( 'title' );
        expect( res.body[0], 'Books in array should contain _id' )
                .to.have.property( '_id' );
        done( );
      } );
  } );

  suite( 'Routing tests', ( ) => {

    suite( 'POST /api/books with title => create book object/expect book object', ( ) => {
      
      test( 'Test POST /api/books with title', done => {
        chai.request( server )
          .post( ENDPOINT )
          .set( 'content-type', 'application/x-www-form-urlencoded' )
          .send( {
            title : 'Test book'
          } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.body, 'response should have an _id' )
                    .to.have.property( '_id' );
            expect( res.body, 'response should have a title' )
                    .to.have.property( 'title' )
                    .to.equal( 'Test book' );
            firstInsertedID = res.body._id;
            done( );
          } )
      } );

      test( 'Test POST /api/books with no title given', done => {
        chai.request( server )
          .post( ENDPOINT )
          .set( 'content-type', 'application/x-www-form-urlencoded' )
          .send( { } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.text, 'response should be "every book should have a name"' )
                    .to.equal( 'every book should have a name' );
            done( );
          } )
      } );

    } );

    suite( 'GET /api/books => array of books', ( ) => {
      
      test( 'Test GET /api/books', done => {
        chai.request( server )
          .get( ENDPOINT )
          .set( 'content-type', 'application/x-www-form-urlencoded' )
          .query( { } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.body, 'response should be an array' ).is.an( 'array' );
            done( );
          } )
      } );      
      
    } );

    suite( 'GET /api/books/[id] => book object with [id]', ( ) => {
      
      test( 'Test GET /api/books/[id] with id not in db', done => {
        chai.request( server )
          .get( `${ENDPOINT}/B4D_1D3NT1F13R` )
          .set( 'content-type', 'application/x-www-form-urlencoded' )
          .query( { } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.text, 'response text should be "no book exists"' )
                    .to.equal( 'no book exists' );
            done( );
          } )
      } );
      
      test( 'Test GET /api/books/[id] with valid id in db', done => {
        chai.request( server )
          .get( `${ENDPOINT}/${firstInsertedID}` )
          .set( 'content-type', 'application/x-www-form-urlencoded' )
          .query( { } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.body, 'response should have an _id' )
                    .to.have.property( '_id' );
            expect( res.body, 'response should have a title to equal "Test book"' )
                    .to.have.property( 'title' )
                    .to.equal( 'Test book' );
            expect( res.body, 'response should have an array property named "comments"' )
                    .to.have.property( 'comments' )
                    .to.be.an( 'array' );
            done( );
          } )
      } );
      
    } );

    suite( 'POST /api/books/[id] => add comment/expect book object with id', ( ) => {
      
      test( 'Test POST /api/books/[id] with comment', done => {
        chai.request( server )
          .post( `${ENDPOINT}/${firstInsertedID}` )
          .set( 'content-type', 'application/x-www-form-urlencoded' )
          .send( { comment: 'Test comments' } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.body, 'response should have an _id' )
                    .to.have.property( '_id' );
            expect( res.body, 'response should have a title to equal "Test book"' )
                    .to.have.property( 'title' )
                    .to.equal( 'Test book' );
            expect( res.body, 'response should have an array property named "comments"' )
                    .to.have.property( 'comments' )
                    .to.be.an( 'array' );
            expect( res.body.comments[res.body.comments.length-1], 'response\'s last comments should equal "Test comments"' )
                    .to.equal( 'Test comments' );
            done( );
          } );
      } );
      
    } );

  } );

} );
