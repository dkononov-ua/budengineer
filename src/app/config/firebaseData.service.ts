import { Injectable } from '@angular/core';
import { ref, get, set, push, remove } from 'firebase/database';
import { app, auth, database } from './firebaseConfig';
import { getAuth, User } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserType } from '../interface/user';
import { UserConfig } from '../interface/userConfig';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  currentUser: User | null = null;
  userType: UserType = UserConfig;
  private userData: any = {};
  private userDataSubject = new BehaviorSubject<any>('');
  public userData$ = this.userDataSubject.asObservable();

  getUserData(): string | null {
    return this.userDataSubject.value;
  }

  constructor(
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe((user) => {
      this.currentUser = user as User | null;
      if (user) {
        this.userData = user;
        if (this.userData && this.userData._delegate) {
          this.userType = {
            displayName: this.userData.displayName,
            email: this.userData.email,
            phoneNumber: this.userData.phoneNumber,
            photoURL: this.userData.photoURL,
            password: this.userData.password,
          };
          this.userDataSubject.next(this.userType);
        }
      }
    });
  }

  // Метод для реєстрації нового користувача
  async register(email: string, password: string, phoneNumber: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);

      if (userCredential.user) {
        // Додати дані в Realtime Database після реєстрації
        await this.addUserDataToDatabase(userCredential.user.uid, {
          email,
          phoneNumber,
          createdAt: new Date().toISOString()
        });

        console.log('User registered and data saved successfully');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Метод для входу користувача
  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);

      if (userCredential.user) {
        // Можливо, потрібно оновити додаткові дані після входу
        await this.addUserDataToDatabase(userCredential.user.uid, {
          lastLogin: new Date().toISOString()
        });

        console.log('User logged in and data updated successfully');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Окремий метод для додавання інформації про користувача в Realtime Database
  private async addUserDataToDatabase(uid: string, data: any): Promise<void> {
    try {
      await this.db.object(`/users/${uid}`).update(data);
      console.log('User data added/updated in Realtime Database');
    } catch (error) {
      console.error('Error updating user data in Realtime Database:', error);
      throw error;
    }
  }

  // Вхід через Google
  async googleLogin(): Promise<void> {
    const provider = new GoogleAuthProvider();

    try {
      // Використовуємо signInWithPopup для входу
      const result = await this.afAuth.signInWithPopup(provider);
      console.log(result)

      // Отримуємо користувача з результату
      const user = result.user;
      console.log('User logged in with Google:', user);

      // Можна зберігати інформацію про користувача чи робити інші дії
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  // Вихід користувача
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      location.reload();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Отримати поточного користувача
  getCurrentUser(): User | null {
    return this.userData._delegate;
  }

  saveImage(selectedImage: File) {
    console.log('Selected image:', selectedImage);
    const filePath = `user_photos/${Date.now()}_${selectedImage.name}`; // Створюємо шлях для файлу
    const fileRef = this.storage.ref(filePath); // Отримуємо посилання на файл в Firebase Storage
    const uploadTask = fileRef.put(selectedImage); // Завантажуємо файл

    uploadTask.snapshotChanges().subscribe({
      next: (snapshot) => {
        // Якщо потрібно, можна обробляти прогрес завантаження
      },
      error: (error) => {
        console.error('Upload failed:', error);
      },
      complete: () => {
        // Після завершення завантаження отримуємо URL файлу
        fileRef.getDownloadURL().subscribe((url: string) => {
          console.log('File available at', url); // URL файлу
          // Тут можна зберігати URL файлу в базу даних або у профіль користувача
        });
      }
    });
  }


}
