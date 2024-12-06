import * as logger from "firebase-functions/logger";
import * as functions from 'firebase-functions';
import axios from 'axios';

const RECAPTCHA_SECRET_KEY = 'YOUR_SECRET_KEY'; // Замініть на ваш секретний ключ reCAPTCHA

export const verifyRecaptcha = functions.https.onRequest(async (req, res) => {
  // Перевірка методу запиту (тільки POST)
  if (req.method !== 'POST') {
    res.status(405).send({ error: 'Only POST requests are accepted' });
    return; // Потрібно повернути після відправки відповіді
  }

  try {
    const token = req.body.token; // Отримуємо токен reCAPTCHA з клієнта
    if (!token) {
      res.status(400).send({ error: 'Token is required' });
      return; // Потрібно повернути після відправки відповіді
    }

    // Відправляємо запит на Google API для перевірки токена
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    const data = response.data;

    // Перевірка валідності токена
    if (!data.success) {
      res.status(400).send({ error: 'Invalid reCAPTCHA token' });
      return; // Потрібно повернути після відправки відповіді
    }

    // Успішна перевірка
    res.status(200).send({ success: true, score: data.score });
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
