fetch("/Shinsho/header.html")
  .then((response) => response.text())
  .then((data) => document.querySelector(".header").innerHTML = data);

fetch("/Shinsho/footer.html")
  .then((response) => response.text())
  .then((data) => document.querySelector(".footer").innerHTML = data)
  .then(hamburger());

  function hamburger() {
    document.querySelector('.hamburger').addEventListener('click', function(){
        this.classList.toggle('active');
        document.querySelector('.menu').classList.toggle('appear');
    });
}