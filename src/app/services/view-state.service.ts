import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { IStudent, Student } from '../models/students';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {

  private _sidebarState = new BehaviorSubject<boolean>(true);
  private _sidebarState$ = this._sidebarState.asObservable();

  private _vitalsEditMode = new BehaviorSubject<boolean>(false);
  private _vitalsEditMode$ = this._vitalsEditMode.asObservable();

  private _selectedStudent = new BehaviorSubject<any>({});
  private _selectedStudent$ = this._selectedStudent.asObservable();

  private _selectedUser = new BehaviorSubject<User | undefined>(undefined);
  private _selectedUser$ = this._selectedUser.asObservable();

  constructor() { }

  getSidebarState(): Observable<boolean> { return this._sidebarState$;}
  setSidebarState(state: boolean) { return this._sidebarState.next(state);}

  getVitalsEditMode(): Observable<boolean> { return this._vitalsEditMode$;}
  setVitalsEditMode(state: boolean) { return this._vitalsEditMode.next(state);}

  getSelectedStudent(): Observable<any> { return this._selectedStudent$;}
  setSelectedStudent(obj: Student) { return this._selectedStudent.next(obj); }

  getSelectedUser(): Observable<User | undefined> { return this._selectedUser$;}
  setSelectedUser(obj: User) { return this._selectedUser.next(obj); }
}
