import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Strings } from '../constants/strings';
import { DocumentSnapshot, Firestore, QueryConstraint, addDoc, arrayUnion, collection, collectionData, doc, getDoc, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IStudent, Student } from '../models/students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private firestore: Firestore) { }

  public GetStudentsAsync(offices: string[], isArchived: boolean = false): Observable<Student[]> {

    const studentCollection = collection(this.firestore, Strings.StudentsCollection);

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

  public GetStudentAsync(id: string): Observable<Student> {

    const configDocument = doc(this.firestore, Strings.StudentsCollection, id);

    const docSnap = getDoc(configDocument);

    return from(docSnap.then((value: DocumentSnapshot) => {
      let document = value.data() as any;
      return new Student(document as Student);
    }));
  }

  public async InsertStudentAsync(student: Student): Promise<boolean> {

    const collectionRef = collection(this.firestore, Strings.StudentsCollection);

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

  public async UpdateStudentAsync(id: string, student: IStudent): Promise<boolean> {

    const docRef = doc(this.firestore, Strings.StudentsCollection, id);
    const auditDocRef = doc(this.firestore, Strings.StudentsHistoryCollection, id)

    try {

      var before = (await getDoc(docRef)).data();

      await updateDoc(docRef, {...student});

      await setDoc(auditDocRef, {
        Id: id,
        History: arrayUnion(before)
      }, { merge: true });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
