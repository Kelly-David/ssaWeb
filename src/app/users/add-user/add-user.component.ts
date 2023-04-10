import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PermittedEmail } from 'src/app/shared/models/permittedEmail';
import { User, UserPermissions, UserRole } from 'src/app/shared/models/user';

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
  public error: string = '';
  public info: string = '';

  private _user: PermittedEmail | undefined;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {

    this.emailForm = formBuilder.group({
      'FormEmail': [{ value: '', disabled: false },[Validators.required, Validators.email, Validators.minLength(5)]]
    })

    this.userForm = formBuilder.group({
      'Form_username': [{ value: '', disabled: true }],
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
  get FormUsername(): string { return this.userForm.get('Form_username')?.value };
  get FormChurchrd(): boolean { return this.userForm.get('FormCheckbox_churchrd')?.value };
  get FormConeyboro(): boolean { return this.userForm.get('FormCheckbox_coneyboro')?.value };
  get FormGlebelands(): boolean { return this.userForm.get('FormCheckbox_glebelands')?.value };
  get FormAdmin(): boolean { return this.userForm.get('FormCheckbox_admin')?.value };

  public async SubmitEmailForm() {
    let email = this.FormEmail.toLowerCase();
    this.permitted = await this.userService.UserEmailExists(email) ? false : true;

    if (this.permitted) {
      this.userForm.get('Form_username')?.setValue(email);
      this.info = 'Email is permitted, please continue.';
    }
    else {
      this.error = 'Email is already in use. Email must be unique.';
    }
   }

  public async SubmitUserForm(): Promise<void> {
    const selectedOffices = this.GetSelectedOffices();

    if (selectedOffices.length <= 0) {
      this.error = 'Please select at least one office.';
      return;
    }

    this._user = new PermittedEmail({
      Id: this.FormUsername.toLowerCase(),
      Email: this.FormUsername.toLowerCase(),
      SignedUp: false,
      Offices: selectedOffices,
      Role: UserRole.Staff,
      Permissions: {
        Admin: this.FormAdmin,
        Editor: true,
        Reader: false
      } as UserPermissions
    });

    if (await this.userService.InsertPermittedEmail(this._user)) {
      this.info = 'User added successfully. The user will be able to register using their email address.';
      this.ClearForms();
    }
   }

  public ClearForms(): void {
    this.userForm.reset();
    this.emailForm.reset();
    this._user = undefined;
    this.error = '';
    this.permitted = false;
  }

  private GetSelectedOffices(): string[] {
    this.error = '';
    let selected = [];

    if (this.FormChurchrd) {
      selected.push('churchrd');
    }

    if (this.FormConeyboro) {
      selected.push('coneyboro');
    }

    if (this.FormGlebelands) {
      selected.push('glebelands');
    }

    return selected;
  }

}
