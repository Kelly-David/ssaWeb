import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../../services/user.service';
import { PermittedEmail } from '../../shared/models/permittedEmail';
import { FirestoreService } from 'src/app/services/firstore.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OfficService } from 'src/app/services/offic.service';
import { Office } from 'src/app/shared/models/GlobalConfiguration';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.scss']
})
export class UserBaseComponent implements OnInit {

  public users!: Observable<User[] | null>;
  public  offices!: Office[];
  public searchTerm!: string;
  public form: FormGroup;

  constructor(private userService: UserService, private officeService: OfficService, private formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      'FormCheckbox_churchrd' : [{ value: true, disabled: false }],
      'FormCheckbox_coneyboro' : [{ value: true, disabled: false }],
      'FormCheckbox_glebelands' : [{ value: true, disabled: false }],
      'FormCheckbox_staff' : [{ value: true, disabled: false }],
      'FormCheckbox_admin' : [{ value: true, disabled: false }],
      'FormCheckbox_archived' : [{ value: false, disabled: false }]
    });
   }

  get FormCheckbox_churchrd(): boolean | undefined { return this.form.get('FormCheckbox_churchrd')?.value }
  get FormCheckbox_coneyboro(): boolean | undefined { return this.form.get('FormCheckbox_coneyboro')?.value }
  get FormCheckbox_glebelands(): boolean | undefined { return this.form.get('FormCheckbox_glebelands')?.value }
  get FormCheckbox_staff(): boolean | undefined { return this.form.get('FormCheckbox_staff')?.value }
  get FormCheckbox_admin(): boolean | undefined { return this.form.get('FormCheckbox_admin')?.value }
  get FormCheckbox_archived(): boolean | undefined { return this.form.get('FormCheckbox_archived')?.value }



  ngOnInit(): void {

    this.users = this.userService.GetUsersAsync("Staff", 0, 200, false);

    this.officeService.Offices$.pipe(take(1)).subscribe(offices => {
      if (offices) {
        this.offices = offices;
      }
    });
  }

  public SubmitFilterForm(): void {

    let formValues: any = {
      offices: [],
      userTypes: [],
      roles: [],
    };

    if (this.FormCheckbox_churchrd) {
      formValues.offices.push('churchrd');
    }

    if (this.FormCheckbox_coneyboro) {
      formValues.offices.push('coneyboro');
    }

    if (this.FormCheckbox_glebelands) {
      formValues.offices.push('glebelands');
    }

    if (this.FormCheckbox_staff) {
      formValues.roles.push('staff');
    }

    if (this.FormCheckbox_admin) {
      formValues.roles.push('admin');
    }
    if (this.FormCheckbox_archived) {
      formValues.userTypes.push('archived');
    }

    console.log(formValues);
  }

}
