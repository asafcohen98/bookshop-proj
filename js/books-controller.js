'use strict'

// That function run when page finished load
function onInit() {
  renderBooksShop()
}

// That function rendering the book shop
function renderBooksShop() {
  var books = getBooks()
  var strHtmls = `<table border="1">
    <thead>
    <td>Id</td>
    <td class="title-sort" onclick="onSortBy(this)">Title</td>
    <td class="price-sort" onclick="onSortBy(this)">Price</td>
    <td colspan="3">Actions</td>
    </thead><tbody>`
  var readBtnHtml = `<button onclick="onRead(ev,)>Read</button>`
  books.forEach(function (book) {
    strHtmls += `<tr>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>$${book.price}</td>
    <td><button class="read-btn" onclick="onRead(${book.id})">Read</button></td>
    <td><button class="update-btn"  onclick="onUpdateBook(${book.id})">Update</button></td>
    <td><button class="delete-btn"  onclick="onRemoveBook(${book.id})">Delete</button></td>
    </tr>`
  })
  strHtmls += `</tbody></table>`
  var elBookShop = document.querySelector('.books-shop')
  elBookShop.innerHTML = strHtmls
}

// That function remove the book from display
function onRemoveBook(bookId) {
  removeBook(bookId)
  renderBooksShop()
}

// That function read the details from the user (name,price)
function onAddBook() {
  var title = document.querySelector('input[name="newBookTitle"]').value
  var price = document.querySelector('input[name="newBookPrice"]').value
  if(title === 'Enter Book Title' || title === '') return
  if(price === 'Enter Book Price' || price === '') return
  addBook(title, price)
  renderBooksShop()
  document.querySelector('input[name="newBookTitle"]').value = 'Enter Book Title' 
  document.querySelector('input[name="newBookPrice"]').value = 'Enter Book Price'

}

// That function read a new price by user 
function onUpdateBook(bookId) {
  var newPrice = prompt('Enter a new price for the book')
  if(!newPrice) return
  updateBook(bookId, +newPrice)
  renderBooksShop()
}

// That function open the modal for the read book click
function onRead(bookId) {
  var book = getBookById(bookId)
  var elModal = document.querySelector('.book-details')
  elModal.querySelector('.book-title span').innerText = book.title
  elModal.querySelector('.book-price span').innerText = book.price
  elModal.querySelector('.book-rate span').innerText = book.rate
  elModal.querySelector('.img-container').innerHTML = `<img src="img/${book.title}.jpeg" alt="No Photo">`
  var elRate = document.querySelector('.rate-section')
  elRate.innerHTML = `<button onclick="onUpdateRate(event,${bookId},-1)">-</button>
  <span>${book.rate}</span>
  <button onclick="onUpdateRate(event,${bookId},1)">+</button>`
  elModal.style.visibility = 'visible'
}

// That function close the modal
function onCloseModal() {
  var elModal = document.querySelector('.book-details')
  elModal.style.visibility = 'hidden'
}

// That function update rate book by user click
function onUpdateRate(ev,bookId,diff){
  ev.stopPropagation() 
  var book = updateBookRate(bookId,diff)
  if(!book) return
  var elRateNow = document.querySelector('.rate-section span').innerText = book.rate
  var elModal = document.querySelector('.book-rate span').innerText = book.rate
  renderBooksShop()
}

// That function makes sort of books table
function onSortBy(tdSort){
  var sortBy = tdSort.innerText
  getSortBy(sortBy) 
  renderBooksShop()
}

// That function render next page
function onNextPage() {
  nextPage();
  renderBooksShop();
}

// That function render back page
function onBackPage(){
  backPage() 
  renderBooksShop()
}



