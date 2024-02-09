import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface User {
  uid: string;
  job_role: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  constructor(private firestore: AngularFirestore) {}

  getProfiles(): Observable<any[]> {
    return this.firestore.collection('profiles').valueChanges();
  }

  getProfile(uid: string): Observable<any[]> {
    return this.firestore.collection('profiles', ref => ref.where('userId', '==', uid)).valueChanges();    
  }

  getUser(uid: string): Observable<User | any> {
    return this.firestore.collection('users').doc<User>(uid).valueChanges();
  }
  
}
