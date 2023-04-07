import { Injectable } from '@angular/core';
import { DocumentSnapshot, Firestore, collection, collectionData, doc, docSnapshots, getDoc, getDocs, onSnapshot } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { GlobalConfiguration, Office } from '../shared/models/GlobalConfiguration';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public GlobalConfig!: Observable<GlobalConfiguration | null>;

  constructor(private firestore: Firestore) {

    this.GlobalConfig = this.GetGlobalConfig();
  }

  private GetGlobalConfig() {

    const configDocument = doc(this.firestore, "Configuration", "GlobalConfig");

    const docSnap = getDoc(configDocument);

    return from(docSnap.then((value: DocumentSnapshot) => {
      if (value.exists()) {
        let document = value.data() as any;
        return document;
      }
      else {
        return null;
      }
    }));
  }

}
