import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {

  private _sidebarState = new BehaviorSubject<boolean>(false);
  private _sidebarState$ = this._sidebarState.asObservable();

  private _vitalsEditMode = new BehaviorSubject<boolean>(false);
  private _vitalsEditMode$ = this._vitalsEditMode.asObservable();

  constructor() { }

  getSidebarState(): Observable<boolean> { return this._sidebarState$;}
  setSidebarState(state: boolean) { return this._sidebarState.next(state);}

  getVitalsEditMode(): Observable<boolean> { return this._vitalsEditMode$;}
  setVitalsEditMode(state: boolean) { return this._vitalsEditMode.next(state);}
}
