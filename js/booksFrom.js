import { Book } from "./classes/bookClass.js";
import { Author } from "./classes/authorClass.js";

function bookNameValidate() {
  let bookName = document.getElementById("bookName");
  let span = document.getElementById("bookNameSpan");
  if (!bookName.value.trim()) {
    span.textContent = "Please enter a book name";
    span.classList.remove("removeValidation");
    span.classList.add("validation");
  } else {
    span.classList.remove("validation");
    span.classList.add("removeValidation");
    return bookName.value;
  }
}

function publishDateValidate() {
  let publishDate = document.getElementById("publishDate");
  let span = document.getElementById("publishDateSpan");
  if (!publishDate.value) {
    span.textContent = "Please enter a Publish Date";
    span.classList.remove("removeValidation");
    span.classList.add("validation");
  } else {
    span.classList.remove("validation");
    span.classList.add("removeValidation");
    return publishDate.value;
  }
}

function bookPriceValidate() {
  let price = document.getElementById("price");
  let span = document.getElementById("priceSpan");
  if (!price.value.trim() || isNaN(price.value)) {
    span.textContent = "Please enter a book price";
    span.classList.remove("removeValidation");
    span.classList.add("validation");
  } else {
    span.classList.remove("validation");
    span.classList.add("removeValidation");
    return parseFloat(price.value);
  }
}

function authorNameValidate() {
  let authorName = document.getElementById("authorName");
  let span = document.getElementById("authorNameSpan");
  if (!authorName.value.trim()) {
    span.textContent = "Please enter an author name";
    span.classList.remove("removeValidation");
    span.classList.add("validation");
  } else {
    span.classList.remove("validation");
    span.classList.add("removeValidation");
    return authorName.value;
  }
}

function authorEmailValidate() {
  let authorEmail = document.getElementById("authorEmail");
  let regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
  let span = document.getElementById("authorEmailSpan");
  if (!regex.test(authorEmail.value)) {
    span.textContent = "Please enter a valid email address";
    span.classList.remove("removeValidation");
    span.classList.add("validation");
  } else {
    span.classList.remove("validation");
    span.classList.add("removeValidation");
    return authorEmail.value;
  }
}

function reset() {
  document.getElementById("bookName").value = "";
  document.getElementById("price").value = "";
  document.getElementById("authorName").value = "";
  document.getElementById("authorEmail").value = "";
}
function addBook(e) {
  e.preventDefault();
  let noBooks = parseInt(location.search.split("=")[1]) || 0;
  let booksArr = [];
  let bookName = bookNameValidate();
  let bookPrice = bookPriceValidate();
  let authorName = authorNameValidate();
  let authorEmail = authorEmailValidate();
  let publishDate = publishDateValidate();
  if (bookName && bookPrice && authorEmail && authorName && publishDate) {
    let author = new Author(authorName, authorEmail);
    let book = new Book(Date.now(), bookName, publishDate, bookPrice, author);
    booksArr.push(book);
    console.log(booksArr);
    reset();
    noBooks--;
    console.log(noBooks);
    if (noBooks <= 0) {
      localStorage.setItem("booksArr", JSON.stringify(booksArr));
      location.href = "../html/displayBooks.html";
    }
  }
}

document
  .getElementById("bookName")
  .addEventListener("change", bookNameValidate);
document.getElementById("price").addEventListener("change", bookPriceValidate);
document
  .getElementById("authorName")
  .addEventListener("change", authorNameValidate);
document
  .getElementById("authorEmail")
  .addEventListener("change", authorEmailValidate);
document.querySelector("form").addEventListener("submit", addBook);
document.getElementById("resetBtn").addEventListener("click", reset);
