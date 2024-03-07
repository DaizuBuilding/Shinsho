fetch("/Shinsho/government/government.html")
  .then((response) => response.text())
  .then((data) => document.querySelector(".index").innerHTML = data);