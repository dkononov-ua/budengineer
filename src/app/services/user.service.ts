import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private auth = getAuth();
  private db = getFirestore();

  // Отримання даних профілю авторизованого користувача
  async getUserProfile() {
    const user = this.auth.currentUser;
    if (user) {
      const userDocRef = doc(this.db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null; // Документ не знайдено
      }
    } else {
      return null; // Користувач не авторизований
    }
  }

  // Збереження профілю користувача
  saveUserProfile(userProfile: any): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Користувач не авторизований');

    const userDocRef = doc(this.db, 'users', user.uid);
    return setDoc(userDocRef, userProfile);
  }

  // Отримання всіх користувачів
  async getAllUsers(): Promise<any[]> {
    const usersCollectionRef = collection(this.db, 'users'); // Посилання на колекцію "users"
    const querySnapshot = await getDocs(usersCollectionRef); // Отримуємо всі документи
    const users: any[] = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() }); // Додаємо кожного користувача в масив
    });
    return users;
  }
}
