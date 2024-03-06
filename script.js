fetch("/Shinsho/header.html")
  .then((response) => response.text())
  .then((data) => document.querySelector(".header").innerHTML = data);

fetch("/Shinsho/footer.html")
  .then((response) => response.text())
  .then((data) => document.querySelector(".footer").innerHTML = data)