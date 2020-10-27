/* ==========================
Jay Ganguli (301164583)
2020-10-27
   ==========================*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { isRegExp } = require('util');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: 'Add Book',
    books: '' // blank object for the book, since we're creating one
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  let newBook = book({
    'Title': req.body.title,
    'Description': '', // this isn't getting used anywhere on the site, but it's in the model, so I left it blank
    'Price': req.body.price,
    'Author': req.body.author,
    'Genre': req.body.genre
  });

  book.create(newBook, (err, book) => {
    if (err)
    {
      // check for errors
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/books');
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  let id = req.params.id;

  book.findById(id, (err, book) =>{
    if (err)
    {
      return console.log(err);
    }
    else
    {
      res.render('books/details', {
        title: 'Update Book',
        books: book
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  let id = req.params.id;

  let updatedBook = book({
    '_id': id,
    'Title': req.body.title,
    'Price': req.body.price,
    'Author': req.body.author,
    'Genre': req.body.genre
  });

  book.updateOne({_id: id}, updatedBook, (err) => {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      res.redirect('/books');
    }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  let id = req.params.id;

  book.remove({_id: id}, (err) => {
    if (err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/books');
    }
  });
});


module.exports = router;
