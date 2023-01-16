import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface User {
  uid: string | null;
  email: string | null;
}

export interface Message {
  createdAt: firebase.firestore.FiedValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User | null = null;
  constructor(
    private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.onAuthStateChanged(user => {
      console.log('changed', user);
      this.currentUser = user; 
    })
  }
}
