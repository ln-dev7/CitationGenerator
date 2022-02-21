import { citations } from "./citations.js";

const DERNIERR_CITATION_STR = "dernierreCitation"
const DERNIERR_JOUR_STR     = "dernierJour"
const INITIAL_CITATION      = 0

window.onload = ()=>{
let citation = document.querySelector(".citation");
let auteur = document.querySelector(".auteur");
let date = document.querySelector(".date");

const day = new Date()
const currentDay = day.toLocaleString().split(",")[INITIAL_CITATION]

let dernierreCitation = INITIAL_CITATION
let dernierJour = ""

if(localStorage.getItem(DERNIERR_CITATION_STR) && localStorage.getItem(DERNIERR_JOUR_STR)){
  dernierreCitation = parseInt(localStorage.getItem(DERNIERR_CITATION_STR))
  dernierJour = localStorage.getItem(DERNIERR_JOUR_STR)
  if (dernierJour !== currentDay) {
    dernierreCitation = dernierreCitation + 1
    if (dernierreCitation <= citations.length) {
      localStorage.setItem(DERNIERR_CITATION_STR, dernierreCitation)
    }else {
      dernierreCitation = INITIAL_CITATION
      localStorage.setItem(DERNIERR_CITATION_STR, INITIAL_CITATION)
    }
    localStorage.setItem(DERNIERR_JOUR_STR, currentDay)
  }
} else {
  localStorage.setItem(DERNIERR_CITATION_STR, INITIAL_CITATION)
  localStorage.setItem(DERNIERR_JOUR_STR, currentDay)
}

let dateValue = new Date();

citation.textContent = citations[dernierreCitation][0];
auteur.textContent = citations[dernierreCitation][1];

dateValue = new Date();

let dateLocale = dateValue.toLocaleString("fr-FR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

date.innerHTML = dateLocale;
}


