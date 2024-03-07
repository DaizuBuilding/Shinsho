fetch("/Shinsho/government/list.html")
  .then((response) => response.text())
  .then((data) => document.querySelector(".index").innerHTML = data);