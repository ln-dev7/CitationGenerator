import { citations } from "./citations.js";
const APP_NAME = "Citation Generator"
const LAST_CITATION_STRING = "dernierreCitation"
const LAST_DAY_STRING = "dernierJour"
const HOUR_STRING = "hour"
const INITIAL_CITATION = 0
const CITATION_STEP = 1
const CITATION_INDEX = 0
const AUTOR_INDEX = 1
const DATE_INDEX = 0
const BASE_URL = location.protocol + "//" + location.host + "/"
const ICON_PATH = `${BASE_URL}img/icons/512.png`
const DATE_LANG = "fr-FR"
const DATE_FORMAT = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}

window.onload = () => {
  const citation = document.querySelector(".citation")
  const auteur = document.querySelector(".auteur")
  const date = document.querySelector(".date")

  const day = new Date()
  const currentDay = day.toLocaleString().split(",")[DATE_INDEX]
  const currentHour = day.toLocaleString().split(",")[1].split(":")[0]
  const myCitationOfDay = getCitationOfDay(currentDay)
  const dateLocale = day.toLocaleString(DATE_LANG, { ...DATE_FORMAT })

  const title = citations[myCitationOfDay][CITATION_INDEX]
  const author = citations[myCitationOfDay][AUTOR_INDEX]

  showNotificationByHour(title, author, currentHour)
  checkConnexion()
  copyToClipboard()

  citation.textContent = title
  auteur.textContent = author
  date.innerHTML = dateLocale

}

/**
 * @param {number} currentDay
 * @return {void}
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

/**
 * @param {String} title
 * @param {String} msg
 * @return {void}
 */
const showNotification = (title, msg) => {
  const granted = "granted"
  const denied = "denied"
  if (Notification.permission == granted) {
    const notification = new Notification(title, {
      body: msg,
      icon: ICON_PATH
    })
    notification.onclick = () => {
      window.location = BASE_URL
    }
  } else if (Notification.permission !== denied) {
    Notification.requestPermission().then(permission => {
      console.log(permission)
    })
  }
}

/**
 * @param {String} author
 * @param {String} content
 * @param {String} currentHour
 * @returns {void}
 */
const showNotificationByHour = (author, content, currentHour) => {

  currentHour = parseInt(currentHour)
  if (localStorage.getItem(HOUR_STRING)) {
    const storageHour = parseInt(localStorage.getItem(HOUR_STRING))
    if (storageHour !== currentHour) {
      localStorage.setItem(HOUR_STRING, currentHour)
      showNotification(author, content)
    }
  } else {
    localStorage.setItem(HOUR_STRING, currentHour)
    showNotification(author, content)
  }

}

const checkConnexion = () => {
  const verifyIfOffLine = () => {
    const ifNotOnLine = window.setInterval(() => {
      if (!navigator.onLine) {
        showNotification(APP_NAME, "Vous êtes hors connexions, navigation hors connexion activées")
        clearTimeout(ifNotOnLine)
        verifyIfOnLine()
      }
    }, 500)
  }
  const verifyIfOnLine = () => {
    const ifOnLine = window.setInterval(() => {
      if (navigator.onLine) {
        window.location = BASE_URL
        showNotification(APP_NAME, "Connexion retablie")
        clearTimeout(ifOnLine)
        verifyIfOffLine()
      }
    }, 500)
  }
  verifyIfOffLine()
}

const copyToClipboard = () => {
  const copyContainer = document.querySelector(".copy")
  if(copyContainer !== null)
    copyContainer.addEventListener("click", () => {
      const citation = document.querySelector(".citation").textContent
      const successTxt = "Citation copiée dans votre presse papier"
      navigator.clipboard.writeText(citation)
      showAlert(successTxt)
      showNotification(successTxt, citation)
    })
}

/**
 * 
 * @param {String} text 
 */
const showAlert = (text) => {
  const body = document.querySelector("body")
  const alert = document.createElement("div")
  const spanIcon = document.createElement("span")
  const spanTxt = document.createElement("span")
  const timeToHide = 3000
  spanIcon.classList.add("icon")
  spanTxt.classList.add("msg")
  alert.classList.add("alert")
  spanTxt.textContent = text
  alert.appendChild(spanIcon)
  alert.appendChild(spanTxt)
  body.appendChild(alert)

  const timer = setTimeout(() => {
    alert.remove()
    clearTimeout(timer)
  }, timeToHide)
}
// import { citations } from "./citations.js";

// let citation = document.querySelector(".citation");
// let auteur = document.querySelector(".auteur");
// let date = document.querySelector(".date");

// let time = 86400000;

// let count = Math.floor(Math.random() * citations.length);
// let dateValue = new Date();

// let dateLocale = dateValue.toLocaleString("fr-FR", {
//   weekday: "long",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// });

// citation.innerHTML = citations[count][0];
// auteur.innerHTML = citations[count][1];
// date.innerHTML = dateLocale;

// setInterval(() => {
//   count = Math.floor(Math.random() * citations.length);

//   citation.textContent = citations[count][0];
//   auteur.textContent = citations[count][1];

//   dateValue = new Date();

//   dateLocale = dateValue.toLocaleString("fr-FR", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   date.innerHTML = dateLocale;
// }, time);

