import { Book } from "./classes/bookClass.js";
import { Author } from "./classes/authorClass.js";

export function bookNameValidate(obj) {
  let bookName = obj.querySelector("#bookName");
  if (!bookName.value.trim()) {
    if (!obj.querySelector("#bookNameSpan")) {
      obj;
      let span = document.createElement("span");
      span.textContent = "Please enter a book name";
      span.id = "bookNameSpan";
      span.classList.add("validation");
      bookName.insertAdjacentElement("afterend", span);
    }
  } else {
    let span = obj.querySelector("#bookNameSpan");
    if (span) {
      span.remove();
    }
    return bookName.value;
  }
}

export function publishDateValidate(obj) {
  let publishDate = obj.querySelector("#publishDate");
  if (!publishDate.value) {
    if (!obj.querySelector("#publishDateSpan")) {
      let span = document.createElement("span");
      span.textContent = "Please enter a Publish Date";
      span.id = "publishDateSpan";
      span.classList.add("validation");
      publishDate.insertAdjacentElement("afterend", span);
    }
  } else {
    let span = obj.querySelector("#publishDateSpan");
    if (span) {
      span.remove();
    }
    return publishDate.value;
  }
}

export function bookPriceValidate(obj) {
  let price = obj.querySelector("#price");
  if (!price.value.trim() || isNaN(price.value)) {
    if (!obj.querySelector("#priceSpan")) {
      let span = document.createElement("span");
      span.textContent = "Please enter a book price";
      span.id = "priceSpan";
      span.classList.add("validation");
      price.insertAdjacentElement("afterend", span);
    }
  } else {
    let span = obj.querySelector("#priceSpan");
    if (span) {
      span.remove();
    }
    return parseFloat(price.value);
  }
}

export function authorNameValidate(obj) {
  let authorName = obj.querySelector("#authorName");
  if (!authorName.value.trim()) {
    if (!obj.querySelector("#authorNameSpan")) {
      let span = document.createElement("span");
      span.textContent = "Please enter an author name";
      span.id = "authorNameSpan";
      span.classList.add("validation");
      authorName.insertAdjacentElement("afterend", span);
    }
  } else {
    let span = obj.querySelector("#authorNameSpan");
    if (span) {
      span.remove();
    }
    return authorName.value;
  }
}

export function authorEmailValidate(obj) {
  let authorEmail = obj.querySelector("#authorEmail");
  let regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

  if (!regex.test(authorEmail.value)) {
    if (!obj.querySelector("#authorEmailSpan")) {
      let span = document.createElement("span");
      span.textContent = "Please enter a valid email address";
      span.id = "authorEmailSpan";
      span.classList.add("validation");
      authorEmail.insertAdjacentElement("afterend", span);
    }
  } else {
    let span = obj.querySelector("#authorEmailSpan");
    if (span) {
      span.remove();
    }
    return authorEmail.value;
  }
}

function reset() {
  document.getElementById("bookName").value = "";
  document.getElementById("price").value = "";
  document.getElementById("authorName").value = "";
  document.getElementById("authorEmail").value = "";
  document.getElementById("publishDate").value = "";
}

let booksArr = [];
let noBooks = parseInt(location.search.split("=")[1]) || 0;
function addBook(e) {
  e.preventDefault();

  let bookName = bookNameValidate(document);
  let bookPrice = bookPriceValidate(document);
  let authorName = authorNameValidate(document);
  let authorEmail = authorEmailValidate(document);
  let publishDate = publishDateValidate(document);
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

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("bookName").addEventListener("change", function () {
    bookNameValidate(document);
  });
  document.getElementById("price").addEventListener("change", function () {
    bookPriceValidate(document);
  });
  document
    .getElementById("publishDate")
    .addEventListener("change", function () {
      publishDateValidate(document);
    });
  document.getElementById("authorName").addEventListener("change", function () {
    authorNameValidate(document);
  });
  document
    .getElementById("authorEmail")
    .addEventListener("change", function () {
      authorEmailValidate(document);
    });
  document.querySelector("form").addEventListener("submit", addBook);
  document.getElementById("resetBtn").addEventListener("click", function () {
    reset();
  });
});
