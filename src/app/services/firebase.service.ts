import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = false;
  user: Observable<any>;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user = auth.authState;
  }

  async signIn(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res: { user: any }) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  async signUp(name: string, email: string, password: string, role: string) {
    try {
      const credential = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = credential.user;
      if (user) {
        await this.firestore
          .collection('users')
          .doc(user.uid)
          .set({ name, email, role });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async logOut() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }
}
