
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  inputPicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    
    if (selectedDate.getTime() <= Date.now()) {
      
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#ef4040',
        titleColor: '#fff',
        messageColor: '#fff',
      });
      refs.btnStart.disabled = true;
      userSelectedDate = null;
    } else {
    
      refs.btnStart.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(refs.inputPicker, options);

refs.btnStart.addEventListener('click', () => {
  refs.btnStart.disabled = true;
  refs.inputPicker.disabled = true;

  updateTimer(); 
  timerId = setInterval(updateTimer, 1000);
});

function updateTimer() {
  const currentTime = new Date();
  const deltaTime = userSelectedDate - currentTime;

  if (deltaTime <= 0) {
    clearInterval(timerId);
    updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    refs.inputPicker.disabled = false; 
    return;
  }

  const timeComponents = convertMs(deltaTime);
  updateTimerInterface(timeComponents);
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
