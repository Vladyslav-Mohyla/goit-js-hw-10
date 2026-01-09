import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements['delay'].value);


  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const status = form.elements['state'].value;
    

      if (status === 'fulfilled') {
        resolve(delay);
      } else if (status === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(() => {
      iziToast.show({
        title: '✅',
        message: ` Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(() => {
      iziToast.show({
        title: '❌',
        message: ` Rejected promise in ${delay}ms`,
      });
    });
});
