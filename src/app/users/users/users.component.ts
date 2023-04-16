import { Component, Input, OnInit, SimpleChange, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { PermittedEmail } from '../../models/permittedEmail';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnChanges {

  @Input() userList: User[] | null | undefined;
  @Output() selectedUserEvent = new EventEmitter<User>();

  public users: User[] | null | undefined;
  public emails: PermittedEmail[] | null | undefined;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.hasOwnProperty('input')) {

      if (changes['input'].isFirstChange()) { // AKA initialization by angular

      } else {

      }
    }
  }

  SelectUser(user: User) {
    this.selectedUserEvent.emit(user);
  }

}

