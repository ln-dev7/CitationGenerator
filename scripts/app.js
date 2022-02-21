import { citations } from "./citations.js";

const LAST_CITATION_STRING = "dernierreCitation"
const LAST_DAY_STRING = "dernierJour"
const INITIAL_CITATION = 0
const CITATION_STEP = 1
const CITATION_INDEX = 0
const AUTOR_INDEX = 1
const DATE_INDEX = 0

window.onload = () => {
  const citation = document.querySelector(".citation")
  const auteur = document.querySelector(".auteur")
  const date = document.querySelector(".date")

  const day = new Date()

  const currentDay = day.toLocaleString().split(",")[DATE_INDEX]
  const myCitationOfDay = getCitationOfDay(currentDay)

  const dateLocale = day.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  citation.textContent = citations[myCitationOfDay][CITATION_INDEX]
  auteur.textContent = citations[myCitationOfDay][AUTOR_INDEX]
  date.innerHTML = dateLocale;

}

/**
 * @param currentDay int
 * @return dernierreCitation int
 */
const getCitationOfDay = (currentDay) => {
  let dernierreCitation = INITIAL_CITATION
  let dernierJour = ""

  if (localStorage.getItem(LAST_CITATION_STRING) && localStorage.getItem(LAST_DAY_STRING)) {
    dernierreCitation = parseInt(localStorage.getItem(LAST_CITATION_STRING))
    dernierJour = localStorage.getItem(LAST_DAY_STRING)
    if (dernierJour !== currentDay) {
      dernierreCitation = dernierreCitation + CITATION_STEP
      if (dernierreCitation <= citations.length) {
        localStorage.setItem(LAST_CITATION_STRING, dernierreCitation)
      } else {
        dernierreCitation = INITIAL_CITATION
        localStorage.setItem(LAST_CITATION_STRING, INITIAL_CITATION)
      }
      localStorage.setItem(LAST_DAY_STRING, currentDay)
    }
  } else {
    localStorage.setItem(LAST_CITATION_STRING, INITIAL_CITATION)
    localStorage.setItem(LAST_DAY_STRING, currentDay)
  }

  return dernierreCitation

}

