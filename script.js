'use strict';
////////////////////
//Data
const birthDateMannu = new Date(1989, 8, 15);
const birthMonthMannu = birthDateMannu.getMonth() + 1;
const birthDayMannu = birthDateMannu.getDate();
// console.log(birthDateMannu);
// console.log(birthMonthMannu);
// console.log(birthDayMannu);
const birthDateSonia = new Date(1994, 10, 7);
const birthMonthSonia = birthDateSonia.getMonth() + 1;
const birthDaySonia = birthDateSonia.getDate();
// console.log(birthDateSonia);
// console.log(birthMonthSonia);
// console.log(birthDaySonia);
////////////////////
//Elements
const itEl = document.querySelectorAll('.light-it');
const isEl = document.querySelectorAll('.light-is');
const tenMinEl = document.querySelectorAll('.light-ten-m');
const halfEl = document.querySelectorAll('.light-half');
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

const mannuEl = document.querySelectorAll('.light-mannu');
const soniaEl = document.querySelectorAll('.light-sonia');

// const btnCheckClock = document.querySelector('.btn-clock');

//TODO: make clock persist even when user changes tabs on browser

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

////////////////////////
//Clock
const lookupMin = [
  ['fivePast', [...fiveMinEl, ...pastEl]],
  ['tenPast', [...tenMinEl, ...pastEl]],
  ['quarterPast', [...quarterEl, ...pastEl]],
  ['twentyPast', [...twentyEl, ...pastEl]],
  ['twentyFivePast', [...twentyEl, ...fiveMinEl, ...pastEl]],
  ['halfPast', [...halfEl, ...pastEl]],
  ['twentyFiveTo', [...twentyEl, ...fiveMinEl, ...toEl]],
  ['twentyTo', [...twentyEl, ...toEl]],
  ['quarterTo', [...quarterEl, ...toEl]],
  ['tenTo', [...tenMinEl, ...toEl]],
  ['fiveTo', [...fiveMinEl, ...toEl]],
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
    case 0:
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

  currentTimeArr.forEach(element => {
    element.classList.add('letter-light');
    setTimeout(() => {
      element.classList.remove('letter-light');
    }, 1000 * 59 + 900);
  });

  //   check birthday
  if (currentDay === birthDayMannu && currentMonth === birthMonthMannu) {
    birthdayArr.push(...mannuEl);
    birthdayArr.push(...birthdayEl);
  } else if (currentDay === birthDaySonia && currentMonth === birthMonthSonia) {
    birthdayArr.push(...soniaEl);
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
