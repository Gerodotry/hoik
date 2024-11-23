import http from 'k6/http';
import { sleep } from 'k6';

// Функція для випадкової затримки між запитами
function getThinkTime() {
  return Math.random() * (2 - 1) + 1; // випадкова затримка між 1 і 2 секундами
}

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contactsRamping: {
      executor: 'ramping-vus',
      startTime: '0s', // Починається одразу
      startVUs: 0,
      stages: [
        { duration: '20s', target: 10 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
    contactsConstantRate: {
      executor: 'constant-arrival-rate',
      duration: '20s',
      rate: 10,
      timeUnit: '1s',
      preAllocatedVUs: 1,
      maxVUs: 20,
    },
    contactsConstantVUs: {
      executor: 'constant-vus',
      vus: 5,
      duration: '20s',
    },
  },
};

export default function () {
  // Виконання GET запиту
  http.get('http://127.0.0.1:8000/products/45600/');
  sleep(getThinkTime()); // додаємо затримку
}
