import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ListFilter } from 'src/app/models/filters';
import { PageType } from 'src/app/models/web';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.scss']
})

export class UserBaseComponent implements OnInit {

  public authUser$: Observable<any>;
  public users!: Observable<User[] | null>;
  public searchTerm!: string;
  public hideSidebar = false;
  public selectedUser: User | undefined;
  public PageType = PageType.User;

  private filter!: ListFilter;

  constructor(private userService: UserService) {

    this.authUser$ = this.userService.LoggedInUser;
   }

  ngOnInit(): void {
  }

  public GetSelectedUser($event: any): void {
    this.selectedUser = $event;
  }

  public SearchTermChanged($event: any): void {
    this.searchTerm = $event;
  }

  public SidebarChanged($event: any): void {
    this.hideSidebar = $event;
  }

  public ReceiveFilters($event: any):void {
    this.FetchUsers($event as ListFilter);
  }

  private FetchUsers(filter: ListFilter) {
    this.users = this.userService.GetUsersAsync("Staff", 0, 200,
    filter.includeArchived, filter.offices, filter.includeAdmin);
  }

}
