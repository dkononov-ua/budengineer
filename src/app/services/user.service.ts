import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private auth = getAuth();
  private db = getFirestore();

  async getUserProfile() {
    const user = this.auth.currentUser;
    if (user) {
      // Отримуємо дані користувача з Firestore
      const userDocRef = doc(this.db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // console.log('Документ не знайдено');
        return null;
      }
    } else {
      // console.log('Користувач не авторизований');
      return null;
    }
  }

  saveUserProfile(userProfile: any): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Користувач не авторизований');

    const userDocRef = doc(this.db, 'users', user.uid);
    return setDoc(userDocRef, userProfile);
  }
}
