import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  ext: {
    prometheus: {
      address: 'http://localhost:6565', // Налаштування Prometheus
    },
  },
  scenarios: {
    contactsRamping: {
      executor: 'ramping-vus',
      startTime: '0s',
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
