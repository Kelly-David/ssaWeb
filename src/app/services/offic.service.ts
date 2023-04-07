import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, query } from '@angular/fire/firestore';
import { Office } from '../shared/models/GlobalConfiguration';

@Injectable({
  providedIn: 'root'
})
export class OfficService {

  public Offices$: Observable<Office[]>;

  private OfficesCollection: string = "Offices";

  constructor(private firestore: Firestore) {
    this.Offices$ = this.GetOffices();
   }

  private GetOffices(): Observable<Office[]> {

    const officeCollection = collection(this.firestore, this.OfficesCollection);

    return collectionData(officeCollection) as Observable<Office[]>;
  }
}
