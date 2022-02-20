import { citations } from "./citations.js";

let citation = document.querySelector(".citation");
let auteur = document.querySelector(".auteur");
let date = document.querySelector(".date");

let dateValue = new Date();

let time = 86400000;
let count = 0;

setInterval(() => {
  count = count + 1;
  citation.textContent = citations[count][0];
  auteur.textContent = citations[count][1];

  dateValue = new Date();

  let dateLocale = dateValue.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  date.innerHTML = dateLocale;

}, time);
