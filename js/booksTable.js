function populateTable() {
  let books = JSON.parse(localStorage.getItem("booksArr"));
  const table = document.querySelector("table");
  if (books) {
    books.forEach((book) => {
      const tr = document.createElement("tr");
      tr.id = book.id;
      tr.innerHTML = `<td data-label=name><span>${book.name}</span><input type="text" class="hide"  /></td>
        <td data-label=publishDate><span>${book.publishDate}</span><input type="date" class="hide"  /></td>
        <td data-label=price><span>$${book.price}</span><input type="number" class="hide" /></td>
        <td data-label=authorName><span>${book.author.name}</span><input type="text" class="hide"  /></td>
        <td data-label=authorEmail><span>${book.author.email}</span><input type="email" class="hide"  /></td>
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

populateTable();

function cancel(e, id) {
  const tr = document.getElementById(id);

  Array.from(tr.children).forEach((td) => {
    if (td.classList.contains("button-container")) {
      td.querySelector(".edit-button").classList.remove("hide");
      td.querySelector(".delete-button").classList.remove("hide");
      td.querySelector(".save-button").classList.add("hide");
      td.querySelector(".cancel-button").classList.add("hide");
    } else {
      const input = td.querySelector("input");
      const span = td.querySelector("span");
      span.classList.remove("hide");
      input.classList.add("hide");
    }
  });
}
function edit(e, id) {
  const tr = document.getElementById(id);
  const booksArr = JSON.parse(localStorage.getItem("booksArr"));
  const book = booksArr.find((book) => book.id === id);

  Array.from(tr.children).forEach((td) => {
    if (td.classList.contains("button-container")) {
      td.querySelector(".edit-button").classList.add("hide");
      td.querySelector(".delete-button").classList.add("hide");
      td.querySelector(".save-button").classList.remove("hide");
      td.querySelector(".cancel-button").classList.remove("hide");
    } else {
      const input = td.querySelector("input");
      const span = td.querySelector("span");
      input.classList.remove("hide");
      input.focus();
      if (td.getAttribute("data-label") === "authorName") {
        input.value = book.author.name;
      } else if (td.getAttribute("data-label") === "authorEmail") {
        input.value = book.author.email;
      } else {
        input.value = book[td.getAttribute("data-label")];
      }

      span.classList.add("hide");
    }
  });
}

function save(e, id) {
  const tr = document.getElementById(id);
  const booksArr = JSON.parse(localStorage.getItem("booksArr"));
  const book = booksArr.find((book) => book.id === id);
  Array.from(tr.children).forEach((td) => {
    if (td.classList.contains("button-container")) {
      td.querySelector(".edit-button").classList.remove("hide");
      td.querySelector(".delete-button").classList.remove("hide");
      td.querySelector(".save-button").classList.add("hide");
      td.querySelector(".cancel-button").classList.add("hide");
    } else {
      const input = td.querySelector("input");
      const span = td.querySelector("span");
      span.classList.remove("hide");
      if (td.getAttribute("data-label") === "authorName") {
        book.author.name = input.value;
        span.textContent = book.author.name;
      } else if (td.getAttribute("data-label") === "authorEmail") {
        book.author.email = input.value;
        span.textContent = book.author.email;
      } else {
        book[td.getAttribute("data-label")] = input.value;
        span.textContent = book[td.getAttribute("data-label")];
      }
      input.classList.add("hide");
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
