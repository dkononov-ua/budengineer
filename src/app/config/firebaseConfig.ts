import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database'; // Для Realtime Database
import { getStorage } from 'firebase/storage'; // Для Storage

const firebaseConfig = {
  apiKey: "AIzaSyDTTIR5-oTdNUlvlVPd4_tDx8FqxdKdClI",
  authDomain: "budengineer-f2844.firebaseapp.com",
  databaseURL: "https://budengineer-f2844-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "budengineer-f2844",
  storageBucket: "budengineer-f2844.firebasestorage.app",
  messagingSenderId: "610368439751",
  appId: "1:610368439751:web:84cf8d1d23ce46c89c85e2",
  measurementId: "G-S1DRH72RHL"
};

// Ініціалізуємо Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Для Realtime Database
const storage = getStorage(app); // Для Storage

// Експортуємо екземпляри
export { firebaseConfig, app, auth, analytics, database, storage };
