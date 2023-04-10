import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Strings } from '../constants/strings';
import { Attendance } from '../models/attendance';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private firestore: Firestore) { }

  public async GetAttendance(id: string = ''): Promise<Attendance> {

    if (id === '') {
      const dateString = new Date().toLocaleDateString();
      id = dateString.split('/').join('');
    }

    const docRef = doc(this.firestore, Strings.AttendanceCollection, id);

    const attendance = await getDoc(docRef);

    if (attendance.exists()) {
      return attendance.data() as Attendance;
    }

    await setDoc(docRef, <Attendance>{
      ChildrenSignedIn: 0,
      ChildrenSignedOut: 0,
      StaffSignedIn: 0,
      StaffSignedOut: 0
    });

    return (await getDoc(docRef)).data() as Attendance;
  }
}
