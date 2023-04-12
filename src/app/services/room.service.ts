import { Injectable } from '@angular/core';
import { Firestore, QueryConstraint, collection, collectionData, doc, query, setDoc, where } from '@angular/fire/firestore';
import { Strings } from '../constants/strings';
import { map } from 'rxjs/operators';
import { IRoom, Room } from '../models/room';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private firestore: Firestore) { }

  public GetRoomsAsync(offices: string[]): Observable<Room[]> {

    const roomsCollection = collection(this.firestore, Strings.RoomsCollection);

    var constraints: QueryConstraint[] = []

    constraints.push(where('Office', 'in', offices));
    constraints.push(where("IsArchived", "==", false));

    const roomQuery = query(roomsCollection, ...constraints);

    return collectionData(roomQuery).pipe(map(documents => {
      let rooms = documents;
      return rooms.map(document => {
        return new Room(document as IRoom);
      })
    }));
   }

   public async InsertRoomAsync(room: Room): Promise<boolean> {

    const collectionRef = collection(this.firestore, Strings.RoomsCollection);

    const docRef = doc(collectionRef);

    room.Id = docRef.id;

    try {
      await setDoc(docRef, <Room>room.ToPlainObj);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


}
