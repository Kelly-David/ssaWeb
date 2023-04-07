import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PermittedEmail } from 'src/app/shared/models/permittedEmail';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnChanges {

  @Input() authUser!: User;

  public userForm: FormGroup;
  public emailForm: FormGroup;

  public permitted: boolean = false;
  public errors: string = '';

  private _user: PermittedEmail | undefined;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {

    this._user = new PermittedEmail({});

    this.emailForm = formBuilder.group({
      'FormEmail': [{ value: '', disabled: false },[Validators.required, Validators.email, Validators.minLength(5)]]
    })

    this.userForm = formBuilder.group({
      'Form_username': [{ value: this._user.Email, disabled: true }],
      'FormCheckbox_churchrd': [{ value: false, disabled: true }],
      'FormCheckbox_coneyboro': [{ value: false, disabled: true }],
      'FormCheckbox_glebelands': [{ value: false, disabled: true }],
      'FormCheckbox_admin': [{ value: false, disabled: false }],
    });
  }

  ngOnChanges(): void {

    if (this.authUser) {
      this.authUser.Offices.forEach(office => {
        const officeFormControlName = 'FormCheckbox_' + office;
        this.userForm.get(officeFormControlName)?.enable(); // can only add users to own offices
      });
    }
  }

  get FormEmail(): string { return this.emailForm.get('FormEmail')?.value };
  get FormChurchrd(): boolean { return this.userForm.get('FormCheckbox_churchrd')?.value };
  get FormConeyboro(): boolean { return this.userForm.get('FormCheckbox_coneyboro')?.value };
  get FormGlebelands(): boolean { return this.userForm.get('FormCheckbox_glebelands')?.value };
  get FormAdmin(): boolean { return this.userForm.get('FormCheckbox_admin')?.value };

  public async SubmitEmailForm() {

    let email = this.FormEmail;

    let permitted = await this.userService.IsUserEmailPermitted(email) ? true : false ;

    if (permitted) {

      this.userForm.get('FormEmail')?.setValue(email);

    }
    else {
      this.errors = "Email already in use";
    }
   }

  public SubmitUserForm(): void { }

}
