import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.scss']
})

export class UserBaseComponent implements OnInit {

  public authUser$: Observable<any>;
  public users!: Observable<User[] | null>;
  public searchTerm!: string;
  public form: FormGroup;
  public filterError: string = '';

  private userFilter: UserFilter;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {

    this.authUser$ = this.userService.LoggedInUser;

    this.form = formBuilder.group({
      'FormCheckbox_churchrd' : [{ value: false, disabled: true }],
      'FormCheckbox_coneyboro' : [{ value: false, disabled: true }],
      'FormCheckbox_glebelands' : [{ value: false, disabled: true }],
      'FormCheckbox_admin' : [{ value: false, disabled: false }],
      'FormCheckbox_archived' : [{ value: false, disabled: false }]
    });

    this.userFilter = {
      offices: [],
      includeAdmin: false,
      includeArchived: false,
    }
   }

  get FormCheckbox_churchrd(): boolean | undefined { return this.form.get('FormCheckbox_churchrd')?.value }
  get FormCheckbox_coneyboro(): boolean | undefined { return this.form.get('FormCheckbox_coneyboro')?.value }
  get FormCheckbox_glebelands(): boolean | undefined { return this.form.get('FormCheckbox_glebelands')?.value }
  get FormCheckbox_admin(): boolean | undefined { return this.form.get('FormCheckbox_admin')?.value }
  get FormCheckbox_archived(): boolean | undefined { return this.form.get('FormCheckbox_archived')?.value }

  ngOnInit(): void {

    this.userService.LoggedInUser.pipe(take(1)).subscribe(user => {
      if (user) {

        this.userFilter.offices = user.Offices;

        user.Offices.forEach(office => {
          const officeFormControlName = 'FormCheckbox_' + office;
          this.form.get(officeFormControlName)?.setValue(true);
          this.form.get(officeFormControlName)?.enable();
        });

        if (!user.Permissions.Admin) {
          this.form.get('FormCheckbox_admin')?.disable();
          this.form.get('FormCheckbox_archived')?.disable();
        }

        this.FetchUsers();
      }
    });
  }

  public SubmitFilterForm(): void {

    this.userFilter.offices = [];

    if (this.FormCheckbox_churchrd) {
      this.userFilter.offices.push('churchrd');
    }

    if (this.FormCheckbox_coneyboro) {
      this.userFilter.offices.push('coneyboro');
    }

    if (this.FormCheckbox_glebelands) {
      this.userFilter.offices.push('glebelands');
    }

    this.userFilter.includeAdmin = this.FormCheckbox_admin ?? false;
    this.userFilter.includeArchived = this.FormCheckbox_archived ?? false;

    if (this.userFilter.offices.length > 0) {
      this.filterError = '';
      this.FetchUsers();
    }
    else{
      this.filterError = 'You must select at least one office';
    }
  }

  private FetchUsers() {

    this.users = this.userService.GetUsersAsync("Staff", 0, 200,
    this.userFilter.includeArchived, this.userFilter.offices, this.userFilter.includeAdmin);
  }
}

export interface UserFilter {
  offices: string[],
  includeAdmin: boolean,
  includeArchived: boolean,
}
