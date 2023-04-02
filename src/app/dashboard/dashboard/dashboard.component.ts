import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user!: Observable<User | null>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    this.user = this.userService.LoggedInUser;
  }

}
