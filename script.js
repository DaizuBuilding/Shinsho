fetch("/Shinsho/header.html")
  .then((response) => response.text())
  .then((data) => document.querySelector(".header").innerHTML = data);

fetch("/Shinsho/footer.html")
  .then((response) => response.text())
  .then((data) => document.querySelector(".footer").innerHTML = data);

const hamburgermenu = document.getElementById('hamburgermenu');
hamburgermenu.addEventListener('click', function() {
    hamburgermenu.classList.toggle('active');
});