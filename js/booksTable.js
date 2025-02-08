import {
  authorEmailValidate,
  authorNameValidate,
  bookNameValidate,
  bookPriceValidate,
  publishDateValidate,
} from "./booksFrom.js";

populateTable();

function populateTable() {
  let books = JSON.parse(localStorage.getItem("booksArr")) || [];
  console.log(books);
  const table = document.querySelector("table");
  table.innerHTML = `
  <thead>
    <tr>
      <th>Book Name</th>
      <th>Publish Date</th>
      <th>Price</th>
      <th>Author Name</th>
      <th>Author Email</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody></tbody>`;

  if (books.length > 0) {
    books.forEach((book) => {
      const tr = document.createElement("tr");
      tr.id = book.id;
      tr.innerHTML = `<td data-label="name"><span>${book.name}</span><input type="text" class="hide" id="bookName"/></td>
        <td data-label="publishDate"><span>${book.publishDate}</span><input type="date" class="hide" id="publishDate"/></td>
        <td data-label="price"><span>$${book.price}</span><input type="number" class="hide" id="price"/></td>
        <td data-label="authorName"><span>${book.author.name}</span><input type="text" class="hide" id="authorName"/></td>
        <td data-label="authorEmail"><span>${book.author.email}</span><input type="email" class="hide" id="authorEmail" required /></td>
        <td class="button-container">
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
          <button class="save-button hide">Save</button>
          <button class="cancel-button hide">Cancel</button>
        </td>`;

      table.children[1].appendChild(tr);

      tr.querySelector(".edit-button").addEventListener("click", (e) =>
        edit(e, book.id)
      );
      tr.querySelector(".delete-button").addEventListener("click", (e) =>
        Delete(e, book.id)
      );
      tr.querySelector(".save-button").addEventListener("click", (e) =>
        save(e, book.id)
      );
      tr.querySelector(".cancel-button").addEventListener("click", (e) =>
        cancel(e, book.id)
      );
    });
  }
}

function toggleButtonVisibility(td) {
  td.querySelector(".edit-button").classList.toggle("hide");
  td.querySelector(".delete-button").classList.toggle("hide");
  td.querySelector(".save-button").classList.toggle("hide");
  td.querySelector(".cancel-button").classList.toggle("hide");
}

function toggleInputVisibility(td) {
  td.querySelector("input").classList.toggle("hide");
  let span = td.querySelectorAll("span");
  span[0].classList.toggle("hide");
  if (span[1]) {
    span[1].remove();
  }
}

function cancel(e, id) {
  const tr = document.getElementById(id);

  Array.from(tr.children).forEach((td) => {
    if (!td.classList.contains("button-container")) {
      toggleInputVisibility(td);
    } else {
      toggleButtonVisibility(td);
    }
  });
}

function edit(e, id) {
  const tr = document.getElementById(id);
  const booksArr = JSON.parse(localStorage.getItem("booksArr")) || [];
  const book = booksArr.find((book) => book.id === id);
  if (book) {
    Array.from(tr.children).forEach((td) => {
      if (!td.classList.contains("button-container")) {
        toggleInputVisibility(td);
        const input = td.querySelector("input");
        input.focus();
        const key = td.dataset.label;
        if (key === "authorName") {
          input.value = book.author.name;
        } else if (key === "authorEmail") {
          input.value = book.author.email;
        } else {
          console.log(book[key]);
          input.value = book[key];
        }
      } else {
        toggleButtonVisibility(td);
      }
    });
  }
}

function save(e, id) {
  const tr = document.getElementById(id);
  const booksArr = JSON.parse(localStorage.getItem("booksArr")) || [];
  const book = booksArr.find((book) => book.id === id);
  let bookName = bookNameValidate(tr);
  let bookPrice = bookPriceValidate(tr);
  let authorName = authorNameValidate(tr);
  let authorEmail = authorEmailValidate(tr);
  let publishDate = publishDateValidate(tr);
  if (bookName && bookPrice && authorEmail && authorName && publishDate) {
    book.name = bookName;
    book.publishDate = publishDate;
    book.price = bookPrice;
    book.author.name = authorName;
    book.author.email = authorEmail;
    Array.from(tr.children).forEach((td) => {
      if (!td.classList.contains("button-container")) {
        toggleInputVisibility(td);
        const span = td.querySelectorAll("span")[0];
        const key = td.dataset.label;
        if (key === "authorName") {
          span.textContent = book.author.name;
        } else if (key === "authorEmail") {
          span.textContent = book.author.email;
        } else if (key === "price") {
          span.textContent = "$" + book.price;
        } else {
          span.textContent = book[key];
        }
      } else {
        toggleButtonVisibility(td);
      }
    });
    localStorage.setItem("booksArr", JSON.stringify(booksArr));
  }
}

function Delete(e, id) {
  const tr = document.getElementById(id);
  let booksArr = JSON.parse(localStorage.getItem("booksArr")) || [];
  booksArr = booksArr.filter((book) => book.id !== id);
  localStorage.setItem("booksArr", JSON.stringify(booksArr));
  tr.remove();
}
