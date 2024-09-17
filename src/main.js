let previousExperience = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

function calculateTotalExperience(team) {
  const now = new Date();

  let maxMilliseconds = 0;

  team.forEach(member => {
    const experienceMilliseconds = now - member.startDate;
    if (experienceMilliseconds > maxMilliseconds) {
      maxMilliseconds = experienceMilliseconds;
    }
  });

  const totalSeconds = Math.floor(maxMilliseconds / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);
  const days = totalDays % 30;
  const totalMonths = Math.floor(totalDays / 30);
  const months = totalMonths % 12;
  const years = Math.floor(totalMonths / 12);

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
  { name: 'Olha', startDate: new Date('2021-08-10T09:00:00') },  // 10 серпня 2021
  { name: 'Nazar', startDate: new Date('2024-07-22T09:00:00') },  // 22 липня 2024
  { name: 'Iren', startDate: new Date('2022-02-01T09:00:00') },   // 1 лютого 2022
  { name: 'Denys', startDate: new Date('2023-07-13T09:00:00') },  // 13 липня 2023
  { name: 'Vlada', startDate: new Date('2023-01-01T09:00:00') }, // 1 січня 2024
];

setInterval(updateExperienceTimer, 1000);
