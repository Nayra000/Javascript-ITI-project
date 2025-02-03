populateTable();

function populateTable() {
  let books = JSON.parse(localStorage.getItem("booksArr"));
  const table = document.querySelector("table");
  table.innerHTML = table.innerHTML = `
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

  if (books) {
    books.forEach((book) => {
      const tr = document.createElement("tr");
      tr.id = book.id;
      tr.innerHTML = `<td data-label=name><span>${book.name}</span><input type="text" class="hide"/></td>
        <td data-label=publishDate><span>${book.publishDate}</span><input type="date" class="hide"/></td>
        <td data-label=price><span>$${book.price}</span><input type="number" class="hide"/></td>
        <td data-label=authorName><span>${book.author.name}</span><input type="text" class="hide"/></td>
        <td data-label=authorEmail><span>${book.author.email}</span><input type="email" class="hide"/></td>
        <td class="button-container">
          <button class="edit-button" onclick="edit(event, ${book.id})">Edit</button>
          <button class="delete-button" onclick="Delete(event, ${book.id})">Delete</button>
          <button class="save-button hide" onclick="save(event, ${book.id})">Save</button>
          <button class="cancel-button hide " onclick="cancel(event, ${book.id})">Cancel</button>
        </td>`;

      table.children[1].appendChild(tr);
    });
  }
}

function toggleMode(td) {
  if (td.classList.contains("button-container")) {
    td.querySelector(".edit-button").classList.toggle("hide");
    td.querySelector(".delete-button").classList.toggle("hide");
    td.querySelector(".save-button").classList.toggle("hide");
    td.querySelector(".cancel-button").classList.toggle("hide");
  } else {
    td.querySelector("input").classList.toggle("hide");
    td.querySelector("span").classList.toggle("hide");
  }
}

function cancel(e, id) {
  const tr = document.getElementById(id);

  Array.from(tr.children).forEach((td) => {
    toggleMode(td);
  });
}
function edit(e, id) {
  const tr = document.getElementById(id);
  const booksArr = JSON.parse(localStorage.getItem("booksArr"));
  const book = booksArr.find((book) => book.id === id);

  Array.from(tr.children).forEach((td) => {
    toggleMode(td);
    if (!td.classList.contains("button-container")) {
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
    }
  });
}

function save(e, id) {
  const tr = document.getElementById(id);
  const booksArr = JSON.parse(localStorage.getItem("booksArr"));
  const book = booksArr.find((book) => book.id === id);
  Array.from(tr.children).forEach((td) => {
    toggleMode(td);
    if (!td.classList.contains("button-container")) {
      const span = td.querySelector("span");
      const input = td.querySelector("input");
      const key = td.dataset.label;
      if (key === "authorName") {
        book.author.name = input.value;
        span.textContent = book.author.name;
      } else if (key === "authorEmail") {
        book.author.email = input.value;
        span.textContent = book.author.email;
      } else {
        book[key] = input.value;
        span.textContent = book[key];
      }
    }
  });
  localStorage.setItem("booksArr", JSON.stringify(booksArr));
}

function Delete(e, id) {
  const tr = document.getElementById(id);
  let booksArr = JSON.parse(localStorage.getItem("booksArr"));
  booksArr = booksArr.filter((book) => book.id !== id);
  localStorage.setItem("booksArr", JSON.stringify(booksArr));
  tr.remove();
}
