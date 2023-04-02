import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../../services/user.service';
import { PermittedEmail } from '../../shared/models/permittedEmail';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.scss']
})
export class UserBaseComponent implements OnInit {

  public users!: Observable<User[] | null>;

  public searchTerm!: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.users = this.userService.GetUsersAsync("Staff", 0, 20);
  }

}
