import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public user$!: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.user$ = this.authService.user;
  }

  public Logout() {
    this.authService.SignOut().then(_ => this.router.navigate(['/sign-in/']))
  }

}
