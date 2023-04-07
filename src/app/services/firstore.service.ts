import { Injectable } from '@angular/core';
import { Firestore, doc, DocumentSnapshot, getDoc, updateDoc, addDoc, where, query, collectionData, collection, DocumentData, setDoc, orderBy, startAt, limit } from '@angular/fire/firestore';
import { Auth, user, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, UserCredential, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { PermittedEmail } from '../shared/models/permittedEmail';
import { Strings } from '../shared/strings';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  public InsertPermittedEmailDocuments() {

    for (let i = 0; i < 20; i++) {

      let document = {
        Email: `webtest${i}@test.com`,
        Id: `webtest${i}@test.com`,
        SignedUp: false,
        Role: 'Staff',
        Offices: ["coneyboro"]
      };

      setDoc(doc(this.firestore, Strings.PermittedEmailsCollection, document.Id), document);
    }
  }

}
