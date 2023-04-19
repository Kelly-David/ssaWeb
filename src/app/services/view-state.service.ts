import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {

  private _sidebarState = new BehaviorSubject<boolean>(false);
  private _sidebarState$ = this._sidebarState.asObservable();

  constructor() { }

  getSidebarState(): Observable<boolean> {
    return this._sidebarState$;
  }

  setSidebarState(state: boolean) {
    return this._sidebarState.next(state);
  }
}
