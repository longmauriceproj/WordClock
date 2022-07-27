'use strict';

////////////////////
//Toggle Elements
const toggle = document.querySelector('.toggler');
const btnGear = document.querySelector('.btn-gear');

//Form Elements
const form = document.querySelector('.form');
const nameEl = document.querySelector('#fName');
const birthdateEl = document.querySelector('#birthday');
const btnSubmit = document.querySelector('.btn-submit');
const warning = document.querySelector('.warning-message');

//Clock Elements
const itEl = document.querySelectorAll('.light-it');
const isEl = document.querySelectorAll('.light-is');
const tenMinEl = document.querySelectorAll('.light-ten-m');
const halfEl = document.querySelectorAll('.light-half');
const aEl = document.querySelector('.light-a');
const quarterEl = document.querySelectorAll('.light-quarter');
const twentyEl = document.querySelectorAll('.light-twenty');
const fiveMinEl = document.querySelectorAll('.light-five-m');
const minutesEl = document.querySelectorAll('.light-minutes');
const oneEl = document.querySelectorAll('.light-one');
const birthdayEl = document.querySelectorAll('.light-birthday');
const toEl = document.querySelectorAll('.light-to');
const pastEl = document.querySelectorAll('.light-past');
const threeEl = document.querySelectorAll('.light-three');
const elevenEl = document.querySelectorAll('.light-eleven');
const fourEl = document.querySelectorAll('.light-four');
const twoEl = document.querySelectorAll('.light-two');
const eightEl = document.querySelectorAll('.light-eight');
const nineEl = document.querySelectorAll('.light-nine');
const sevenEl = document.querySelectorAll('.light-seven');
const fiveHourEl = document.querySelectorAll('.light-five-h');
const sixEl = document.querySelectorAll('.light-six');
const tenHourEl = document.querySelectorAll('.light-ten-h');
const twelveEl = document.querySelectorAll('.light-twelve');
const oclockEl = document.querySelectorAll('.light-oclock');

const nameClockEl = document.querySelectorAll('.light-name');

////////////////////
//Helpers

const roundNearestFive = num => {
  return Math.round(num / 5) * 5;
};

const convertWordToLetters = string =>
  lookupMin.reduce((curr, [key, value]) => {
    if (string === key) curr.push(...value);
    return curr;
  }, []);

const convertUTCToLocal = dateEntry => {
  const utcTime = new Date(dateEntry);
  const timezoneOffset = utcTime.getTimezoneOffset() * 60 * 1000;
  const localTime = new Date(utcTime.getTime() + timezoneOffset);
  return localTime;
};

const addCharToArray = (array, char) => array.push(char);

const resetForm = () => {
  //clear input fields
  nameEl.value = birthdateEl.value = '';
  //close form
  toggle.checked = false;
};

const setNameInClock = (arrayName, arrayClockOld, arrayClockNew) => {
  arrayClockOld.forEach((el, i) => {
    el.innerText = arrayName[i];
    arrayClockNew.push(el);
  });
};

////////////////////////
let userBirthdate = '';
let userBirthDay = '';
let userBirthMonth = '';
let userNameArr = [];
const userNameClockArr = [];

//IIFE to check local storage
(() => {
  //get data from localStorage
  const data = JSON.parse(localStorage.getItem('userInfo'));
  //guard clause
  if (!data) return;
  //iterate through name and save each char in new array
  [...data.name].forEach(char => addCharToArray(userNameArr, char));
  //iterate through light-name divs and insert chars
  setNameInClock(userNameArr, nameClockEl, userNameClockArr);
  //shape birthday data
  userBirthdate = new Date(data.birthday);
  userBirthDay = userBirthdate.getDate();
  userBirthMonth = userBirthdate.getMonth() + 1;
})();

////////////////////////
//Form Feature
/* TODO: disable submit button if input fields are not all filled */

btnSubmit.addEventListener('click', e => {
  e.preventDefault();
  //clear warning message
  warning.innerText = '';
  //get user name and birthdate
  const userNameEntry = nameEl.value.toUpperCase();
  const userBirthdateEntry = birthdateEl.value;
  //validation
  // TODO: have more validation rules i.e. no spaces, symbols, or numbers
  if (userNameEntry === '' || userBirthdateEntry === '') {
    return (warning.innerText = 'Must enter name and birthdate.');
  }
  if (userNameEntry.length > 7) {
    return (warning.innerText = 'Must enter a name with 7 letters or less');
  }

  userBirthdate = convertUTCToLocal(userBirthdateEntry);
  userBirthDay = userBirthdate.getDate();
  userBirthMonth = userBirthdate.getMonth() + 1;
  //remove all items from localStorage
  localStorage.clear();

  //store in local storage to persist data
  const userInfo = {};
  userInfo.name = userNameEntry;
  userInfo.birthday = userBirthdate;
  console.log(userInfo);

  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  //reset userNameArr to empty array (in case there was data from local storage)
  userNameArr = [];

  //iterate through name to get characters
  [...userNameEntry].forEach(char => addCharToArray(userNameArr, char));

  //iterate through light-name divs and insert chars
  setNameInClock(userNameArr, nameClockEl, userNameClockArr);
  //call clock() method
  clock();
  //reset and close form
  resetForm();
});

////////////////////////
//Clock Feature
const lookupMin = [
  ['fivePast', [...fiveMinEl, ...pastEl, ...minutesEl]],
  ['tenPast', [...tenMinEl, ...pastEl, ...minutesEl]],
  ['quarterPast', [...quarterEl, ...pastEl, aEl]],
  ['twentyPast', [...twentyEl, ...pastEl, ...minutesEl]],
  ['twentyFivePast', [...twentyEl, ...fiveMinEl, ...pastEl, ...minutesEl]],
  ['halfPast', [...halfEl, ...pastEl]],
  ['twentyFiveTo', [...twentyEl, ...fiveMinEl, ...toEl, ...minutesEl]],
  ['twentyTo', [...twentyEl, ...toEl, ...minutesEl]],
  ['quarterTo', [...quarterEl, ...toEl, aEl]],
  ['tenTo', [...tenMinEl, ...toEl, ...minutesEl]],
  ['fiveTo', [...fiveMinEl, ...toEl, ...minutesEl]],
];

const lookupHour = [
  twelveEl,
  oneEl,
  twoEl,
  threeEl,
  fourEl,
  fiveHourEl,
  sixEl,
  sevenEl,
  eightEl,
  nineEl,
  tenHourEl,
  elevenEl,
  twelveEl,
  oneEl,
  twoEl,
  threeEl,
  fourEl,
  fiveHourEl,
  sixEl,
  sevenEl,
  eightEl,
  nineEl,
  tenHourEl,
  elevenEl,
];

const clock = function () {
  const now = new Date();
  const currentMin = now.getMinutes();
  const currentHour = now.getHours();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1;
  const currentTimeArr = [];
  const birthdayArr = [];

  currentTimeArr.push(...itEl);
  currentTimeArr.push(...isEl);

  // check hour
  if (roundNearestFive(currentMin) <= 30) {
    const hour = lookupHour[currentHour];
    currentTimeArr.push(...hour);
  } else if (roundNearestFive(currentMin) > 30 && currentHour === 23) {
    const hour = lookupHour[0];
    currentTimeArr.push(...hour);
  } else {
    const hour = lookupHour[currentHour + 1];
    currentTimeArr.push(...hour);
  }

  //check minutes
  switch (roundNearestFive(currentMin)) {
    case 0 || 60:
      currentTimeArr.push(...oclockEl);
      break;
    case 5:
      currentTimeArr.push(...convertWordToLetters('fivePast'));
      break;
    case 10:
      currentTimeArr.push(...convertWordToLetters('tenPast'));
      break;
    case 15:
      currentTimeArr.push(...convertWordToLetters('quarterPast'));
      break;
    case 20:
      currentTimeArr.push(...convertWordToLetters('twentyPast'));
      break;
    case 25:
      currentTimeArr.push(...convertWordToLetters('twentyFivePast'));
      break;
    case 30:
      currentTimeArr.push(...convertWordToLetters('halfPast'));
      break;
    case 35:
      currentTimeArr.push(...convertWordToLetters('twentyFiveTo'));
      break;
    case 40:
      currentTimeArr.push(...convertWordToLetters('twentyTo'));
      break;
    case 45:
      currentTimeArr.push(...convertWordToLetters('quarterTo'));
      break;
    case 50:
      currentTimeArr.push(...convertWordToLetters('tenTo'));
      break;
    case 55:
      currentTimeArr.push(...convertWordToLetters('fiveTo'));
      break;
  }
  //TODO: make helper function. Keep code DRY
  currentTimeArr.forEach(element => {
    element.classList.add('letter-light');
    setTimeout(() => {
      element.classList.remove('letter-light');
    }, 1000 * 59 + 900);
  });

  // check birthday
  if (currentDay === userBirthDay && currentMonth === userBirthMonth) {
    birthdayArr.push(...userNameClockArr);
    birthdayArr.push(...birthdayEl);
  }

  birthdayArr.forEach(element => {
    element.classList.add('letter-birthday');
    setTimeout(() => {
      element.classList.remove('letter-birthday');
    }, 1000 * 59 + 900);
  });
};

clock();
setInterval(clock, 1000 * 60);
