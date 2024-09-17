const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
const HOURS_IN_DAY = 24;
const SECONDS_IN_DAY = HOURS_IN_DAY * SECONDS_IN_HOUR;
const DAYS_IN_MONTH = 30;
const SECONDS_IN_MONTH = DAYS_IN_MONTH * SECONDS_IN_DAY;
const DAYS_IN_YEAR = 365;
const SECONDS_IN_YEAR = DAYS_IN_YEAR * SECONDS_IN_DAY;

let previousExperience = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

function calculateTotalExperience(team) {
  const now = new Date();

  let totalMilliseconds = 0;

  team.forEach(member => {
    const experienceMilliseconds = now - member.startDate;
    totalMilliseconds += experienceMilliseconds;
  });

  const totalSeconds = totalMilliseconds / 1000;

  const years = Math.floor(totalSeconds / SECONDS_IN_YEAR);
  let remainingSeconds = totalSeconds - years * SECONDS_IN_YEAR;

  const months = Math.floor(remainingSeconds / SECONDS_IN_MONTH);
  remainingSeconds -= months * SECONDS_IN_MONTH;

  const days = Math.floor(remainingSeconds / SECONDS_IN_DAY);
  remainingSeconds -= days * SECONDS_IN_DAY;

  const hours = Math.floor(remainingSeconds / SECONDS_IN_HOUR);
  remainingSeconds -= hours * SECONDS_IN_HOUR;

  const minutes = Math.floor(remainingSeconds / SECONDS_IN_MINUTE);
  remainingSeconds -= minutes * SECONDS_IN_MINUTE;

  const seconds = Math.floor(remainingSeconds);

  return { years, months, days, hours, minutes, seconds };
}

function applyTransition(element, newValue, previousValue) {
  if (newValue !== previousValue) {
    element.classList.remove('slide-up', 'slide-down');
    element.classList.add('slide-up');

    setTimeout(() => {
      element.textContent = newValue;
      element.classList.remove('slide-up');
      element.classList.add('slide-down');
    }, 300);
  }
}

function updateExperienceTimer() {
  const experience = calculateTotalExperience(teamMembers);

  applyTransition(document.getElementById('years'), experience.years, previousExperience.years);
  applyTransition(document.getElementById('months'), experience.months, previousExperience.months);
  applyTransition(document.getElementById('days'), experience.days, previousExperience.days);
  applyTransition(document.getElementById('hours'), experience.hours, previousExperience.hours);
  applyTransition(document.getElementById('minutes'), experience.minutes, previousExperience.minutes);
  applyTransition(document.getElementById('seconds'), experience.seconds, previousExperience.seconds);

  previousExperience = { ...experience };
}

const teamMembers = [
  { name: 'Artem Henvald', startDate: new Date('2012-02-06T00:00:00') },
  { name: 'Olha Shatailo', startDate: new Date('2021-08-10T00:00:00') },
  { name: 'Iryna Kukhar', startDate: new Date('2022-02-01T00:00:00') },
  { name: 'Vladyslava Buriakovska', startDate: new Date('2023-01-11T00:00:00') },
  { name: 'Nazar Zholkevskiy', startDate: new Date('2024-07-22T00:00:00') },
  { name: 'Vadym Kulatskyi', startDate: new Date('2022-06-14T00:00:00') },
  { name: 'Valerii Nazarchuk', startDate: new Date('2024-06-05T00:00:00') },
  { name: 'Denys Hona', startDate: new Date('2023-11-13T00:00:00') },
  { name: 'Iryna Marushak', startDate: new Date('2019-11-25T00:00:00') }
];

setInterval(updateExperienceTimer, 1000);
