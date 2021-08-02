"use strict";
const KEY = "booksDB";
const PAGE_SIZE = 2;

var gPageIdx = 0;
var gNextId;
var gBooks;
var gSortBy;
_createBooks();

// That function gets books for display
function getBooks() {
  var books = gBooks;
  console.log('books',books);
  var startIdx = gPageIdx * PAGE_SIZE;
  books = books.slice(startIdx, startIdx + PAGE_SIZE);
  if (gSortBy === "Price") {
    books = books.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (gSortBy === "Title") {
    books = books.sort(function (a, b) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
  }
  return books;
}

// That function creates books
function _createBooks() {
  var books = loadFromStorage(KEY);
  if (!books || !books.length) {
    gNextId = 1;
    books = [
      _createBook("Moby Dick", 19.9),
      _createBook("The Old Man And The Sea", 12.6),
      _createBook("Steve Jobs", 9.9),
    ];
  }
  gBooks = books;
  gNextId = gBooks.length + 1;
  _saveBooksToStorage();
}

// That function gets title and price and return an object (book)
function _createBook(title, price) {
  if (!gNextId) gNextId = 1;
  return {
    id: getNextId(),
    title,
    price,
    rate: 0,
    imgUrl: title,
  };
}

// That function save books to storage
function _saveBooksToStorage() {
  saveToStorage(KEY, gBooks);
}

// That function gets bookId and removes the book
function removeBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  gBooks.splice(bookIdx, 1);
  gNextId--;
  _saveBooksToStorage();
}

// That function gets title and price and add a new book
function addBook(title, price) {
  var book = _createBook(title, price);
  gBooks.push(book);
  _saveBooksToStorage();
}

// That function gets bookId and price and update this book
function updateBook(bookId, newPrice) {
  var bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  gBooks[bookIdx].price = newPrice;
  _saveBooksToStorage();
}

// That function gets bookId and diff and update this book rate
function updateBookRate(bookId, diff) {
  var bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  if (
    (diff === -1 && gBooks[bookIdx].rate === 0) ||
    (diff === 1 && gBooks[bookIdx].rate === 10)
  )
    return;
  gBooks[bookIdx].rate += diff;
  _saveBooksToStorage();
  return gBooks[bookIdx];
}

// That function gets bookId and returns the book
function getBookById(bookId) {
  var readedBook = gBooks.find(function (book) {
    return book.id === bookId;
  });
  return readedBook;
}

// That function get nextID
function getNextId() {
  return gNextId++;
}

// That function update the sort
function getSortBy(sortBy) {
  gSortBy = sortBy;
}

// That function update next page
function nextPage() {
  if (gPageIdx * PAGE_SIZE === gBooks.length) return;
  gPageIdx++;
}

// That function update back page
function backPage() {
  if (gPageIdx === 0) return;
  gPageIdx--;
}
