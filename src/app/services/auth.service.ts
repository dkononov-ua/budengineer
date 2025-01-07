import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Отримання поточного користувача
  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }

  // Вхід користувача
  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Вихід
  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
