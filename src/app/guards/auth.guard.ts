import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userService.LoggedInUser
    .pipe(take(1))
    .pipe(map(user => user && this.userService.CanEdit(user) ? true : false))
    .pipe(tap(loggedIn => {
      if (!loggedIn) {
        console.log("Not logged in");
        this.router.navigate(['sign-in']); 
      }
    }));
  }
  
}
