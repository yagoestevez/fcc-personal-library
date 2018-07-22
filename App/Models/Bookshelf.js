'use strict';

const mongoose   = require( 'mongoose' );
const { Schema } = require( 'mongoose' );

module.exports = class Bookshelf {

  constructor ( ) {
    this.bookSchema = new Schema( {
      title      : { type: String, required: true },
      comments   : Array,
      updated_on :{ type: Number, required: true }
    } );

    this.Book = mongoose.model( 'Book', this.bookSchema );
  };

  async getAllBooks ( ) {
    const book = await this.Book.find( ).sort( { updated_on: 'desc' } );
    return book;
  };

  async getBookByID ( id ) {
    const book = await this.Book.findById( { _id: id } );
    return book;
  };

  async storeOneBook ( title, comment=[] ) {
    const book = new this.Book(
      { title, comment, updated_on: Date.now( ) }
    );
    const result = await book.save( )
    return result;
  };

  async storeBookReview ( id, comment ) {
    const book = await this.Book.findOneAndUpdate(
      { _id   : id },
      { $push : { comments: comment } },
      { new   : true }
    );
    return book;
  };

  async removeBookByID ( id ) {
    const book = await this.Book.findOneAndDelete( { _id: id } );
    return book;
  };

  async removeAllBooks ( ) {
    const book = await this.Book.remove( { } );
    return book;
  };

}