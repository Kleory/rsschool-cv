const time = document.querySelector(".time"),
  hourT = document.querySelector(".hour"),
  minT = document.querySelector(".min"),
  secT = document.querySelector(".sec"),
  cDate = document.querySelector(".cDate");
(greeting = document.querySelector(".greeting")),
  (nameUser = document.querySelector(".nameU")),
  (focus = document.querySelector(".focus"));

const blockquote = document.querySelector("blockquote");
const figcaption = document.querySelector("figcaption");
const btnBlockquote = document.querySelector(".btnBlockquote");

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const btnBgr = document.querySelector(".btnBgr");

const monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const greetings = [
  "Good Night,",
  "Good Morning,",
  "Good Afternoon,",
  "Good Evening,",
];
const base = "./images/";
const images = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];
const partsDay = ["night/", "morning/", "day/", "evening/"];
let indexArrayImg;
let imagesArray = [];
let flag = true;
let flagImg = true;

//Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  hourT.innerHTML = addZero(hour);
  minT.innerHTML = addZero(min);
  secT.innerHTML = addZero(sec);

  setTimeout(showTime, 1000);
}

function firstLoad() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  let i;

  indexArrayImg = hour;

  getImage();

  if (flagImg) {
    i = 3600000 - (min * 60 + sec) * 1000;
    flagImg = false;
  } else {
    i = 3600000;
  }

  setTimeout(firstLoad, i);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

//Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  const indexGreeting = Math.floor(hour / 6);

  greeting.textContent = greetings[indexGreeting];
}

function greetingInterval() {
  let n;
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  setBgGreet();

  if (hour === 0 && !flag) {
    imagesArray = [];
    createArrayImg();
    getQuote();
  }

  if (flag) {
    n = (6 - (hour % 6)) * 3600000 - (min * 60 + sec) * 1000;
    flag = false;
  } else {
    n = 6 * 3600000;
  }

  setTimeout(greetingInterval, n);
}

//Quote
async function getQuote() {
  let data = Math.floor(Math.random() * quotes.length);
  blockquote.textContent = quotes[data].text;
  figcaption.textContent = quotes[data].author;
}

//Create Array img
const createArrayImg = () => {
  let j = 0;
  for (j; j < 4; j++) {
    let copyArray = [...images];
    for (let k = 0; k < 6; k++) {
      let a = Math.floor(Math.random() * copyArray.length);
      imagesArray.push(base + partsDay[j] + copyArray[a]);
      copyArray.splice(a, 1);
    }
  }
};

//Background images Times of day
function viewBgImage(data) {
  const body = document.querySelector("body");
  const src = data;
  const img = document.createElement("img");
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}
function getImage() {
  const index = indexArrayImg % imagesArray.length;
  const imageSrc = imagesArray[index];
  viewBgImage(imageSrc);
  indexArrayImg++;
  btnBgr.disabled = true;
  setTimeout(function () {
    btnBgr.disabled = false;
  }, 1000);
}

// Date
function showDate() {
  let today = new Date(),
    year = today.getFullYear(),
    month = today.getMonth(),
    week = today.getDay(),
    day = today.getDate();

  cDate.innerHTML = `${addDayOfWeek(week)}, ${addMonth(month)} ${addZero(
    day
  )}, ${year}`;
}
function addMonth(m) {
  return monthArr[m];
}
function addDayOfWeek(w) {
  return dayOfWeek[w];
}

// Get Name
function getName() {
  nameUser.textContent = localStorage.getItem("name") || "[Enter Name]";
}

// Set Name
function setName(e) {
  // if (e.type === 'keypress') {
  if (e.which == 13 || e.keyCode == 13) {
    if (!e.target.innerText) {
      localStorage.setItem("name", "[Enter Name]");
    } else {
      localStorage.setItem("name", e.target.innerText);
    }
    nameUser.blur();
  }
  // }
}

// Get Focus
function getFocus() {
  console.log();
  focus.textContent = localStorage.getItem("focus") || "[Enter Focus]";
}

// Set Focus
function setFocus(e) {
  console.log(e);
  // if (e.type === 'keypress') {
  if (e.code === "Enter") {
    if (!e.target.innerText) {
      localStorage.setItem("focus", "[Enter Focus]");
    } else {
      localStorage.setItem("focus", e.target.innerText);
    }

    focus.blur();
  }
  // }
}

//Weather
async function getWeather() {
  city.textContent = localStorage.getItem("city") || "Moscow";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=40314987273ab01800e297d1d3737401&units=metric`;
  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C, ${data.weather[0].description}, wet ${data.main.humidity}%`;
    weatherDescription.textContent = `wind speed ${data.wind.speed} m/s`;
  } else {
    weatherIcon.className = "weather-icon owf isError";
    temperature.textContent = `Unknown city`;
    weatherDescription.textContent = "-";
  }
}

function setCity(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.code === "Enter") {
      if (!e.target.innerText) {
        localStorage.getItem("city");
      } else {
        localStorage.setItem("city", e.target.innerText);
      }
      city.blur();
    }
  }
}

nameUser.addEventListener("keypress", setName);
nameUser.addEventListener("blur", setName);
nameUser.addEventListener("blur", getName);
nameUser.addEventListener("click", () => {
  nameUser.textContent = "";
});

focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("blur", getFocus);
focus.addEventListener("click", () => {
  focus.textContent = "";
});

document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);
city.addEventListener("blur", setCity);
city.addEventListener("blur", getWeather);
city.addEventListener("click", () => {
  city.textContent = "";
});

btnBgr.addEventListener("click", getImage);

btnBlockquote.addEventListener("click", getQuote);

//Run
createArrayImg();
showTime();
greetingInterval();
showDate();
getName();
getFocus();
getQuote();
firstLoad();
