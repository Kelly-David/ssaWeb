import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Strings } from '../constants/strings';
import { Firestore, QueryConstraint, addDoc, collection, collectionData, doc, query, setDoc, where } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Student } from '../models/students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private firestore: Firestore) { }

  public GetStudentsAsync(offices: string[], isArchived: boolean = false): Observable<Student[]> {

    const studentCollection = collection(this.firestore, Strings.StudentCollection);

    var constraints: QueryConstraint[] = []

    constraints.push(where('Office', 'in', offices));
    constraints.push(where("IsArchived", "==", isArchived));

    const studentsQuery = query(studentCollection, ...constraints);

    return collectionData(studentsQuery).pipe(map(documents => {
      let students = documents;
      return students.map(document => {
        return new Student(document as Student);
      })
    }));
  }

  public async InsertStudentAsync(student: Student): Promise<boolean> {

    const collectionRef = collection(this.firestore, Strings.StudentCollection);

    const docRef = doc(collectionRef);

    student.Id = docRef.id;

    console.log(student);

    try {
      await setDoc(docRef, <Student>student.ToPlainObj);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
