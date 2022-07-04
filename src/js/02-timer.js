// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    dateTime: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

const isDisabled = true;
let interval = null;

refs.startBtn.disabled = isDisabled;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
      dateControl(selectedDates[0]);
    },
  };

  const timePicker = flatpickr(refs.dateTime, options);

  function dateControl(date) {
    if (new Date() > date) {
        Notify.failure('Please choose a date in the future');
    } else {
        refs.startBtn.disabled = !isDisabled;
    }
  }    

  refs.startBtn.addEventListener('click', onStart);

  function onStart() {
    refs.startBtn.disabled = isDisabled;
    refs.dateTime.disabled = isDisabled;
    intervalTime();
  };

  function intervalTime() {
    interval = setInterval(() => {
        const difference = timePicker.selectedDates[0] - Date.now()
        readoutVisual(convertMs(difference));
        if (difference < 1000) {
            clearInterval(interval);
            Notify.success("Stop")
        }
    }, 1000)
  }; 

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
 
 
  function addZero(value) {
    return String(value).padStart(2, "0");
  };

  function readoutVisual({ days, hours, minutes, seconds }) {
    refs.days.textContent = addZero(days);
    refs.hours.textContent = addZero(hours);
    refs.minutes.textContent = addZero(minutes);
    refs.seconds.textContent = addZero(seconds);
  };
