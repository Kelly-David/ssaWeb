import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Strings } from '../constants/strings';
import { Firestore, QueryConstraint, collection, collectionData, query, where } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Student } from '../models/students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private firestore: Firestore) { }

  public GetStudentsAsync(offices: string[]): Observable<Student[]> {

    const studentCollection = collection(this.firestore, Strings.StudentCollection);

    var constraints: QueryConstraint[] = []

    constraints.push(where('Office', 'in', offices));

    const studentsQuery = query(studentCollection, ...constraints);

    return collectionData(studentsQuery).pipe(map(documents => {
      let students = documents;
      return students.map(document => {
        return new Student(document as Student);
      })
    }));

  }
}
