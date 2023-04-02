import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public user!: Observable<User | null>;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

   ngOnInit() {

    this.user = this.userService.LoggedInUser;
  }

  public Logout() {
    this.userService.SignOut().then(_ => this.router.navigate(['/sign-in/']))
  }

}
