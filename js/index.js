function sendBooksNum(e) {
    let inpt = document.getElementById("txt-inpt");
    let span = document.querySelector("span");
    if (isNaN(inpt.value) || !inpt.value.trim()) {
      e.preventDefault();
      span.textContent = "Please Enter a Number";
      span.classList.remove("removeValidation");
      span.classList.add("validation");
    } else {
      span.classList.remove("validation");
      span.classList.add("removeValidation");
    }
  }