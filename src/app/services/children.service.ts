import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Child } from '../models/child';
import { Strings } from '../constants/strings';
import { Firestore, QueryConstraint, collection, collectionData, query, where } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  constructor(private firestore: Firestore) { }

  public GetUsersAsync(offices: string[]): Observable<Child[]> {

    const childCollection = collection(this.firestore, Strings.ChildrenCollection);

    var constraints: QueryConstraint[] = []

    constraints.push(where('Office', 'in', offices));

    const childQuery = query(childCollection, ...constraints);

    return collectionData(childQuery).pipe(map(documents => {
      let users = documents;
      return users.map(document => {
        return new Child(document as Child);
      })
    }));

  }
}
