import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const inputPicker = document.querySelector('#datetime-picker')
let timerId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      
        if (userSelectedDate < new Date()) {
            iziToast.show({
              title: 'Hey',
              message: 'Please, choose a date in the future',
            });
          startBtn.disabled = true;
          userSelectedDate = null;
          return;
      } else { 
          startBtn.disabled = false;
      }
    },
};
flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };    
}



function addLeadingZero({days, hours, minutes, seconds}) {
    refs.days.textContent = String(days).padStart(2, '0');
    refs.hours.textContent = String(hours).padStart(2, '0');
    refs.minutes.textContent = String(minutes).padStart(2, '0');
    refs.seconds.textContent = String(seconds).padStart(2, '0');
}

startBtn.addEventListener('click', () => {
    if (!userSelectedDate)
        return;
    inputPicker.disabled = true;
    startBtn.disabled = true;
    
    timerId = setInterval(() => {
        const diff = userSelectedDate - new Date();
        if (diff <= 0) {
            inputPicker.disabled = false;
            startBtn.disabled = false;
            clearInterval(timerId);
            timerId = null;
            return;
        }
        addLeadingZero(convertMs(diff));
    },
        1000);
});



stopBtn.addEventListener('click', () => {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
    inputPicker.disabled = false;
    addLeadingZero({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    return
});



