import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Credentials } from '../../shared/models/credentials';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public emailForm!: FormGroup;
  public form!: FormGroup;
  public emailAllowed!: boolean;
  public errorMessage!: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.Initialize();
  }

  get FormEmail() { return this.emailForm.get('FormEmail')?.value }
  get FormUsername() { return this.form.get('FormUsername')?.value }
  get FormPassword() { return this.form.get('FormPassword')?.value }
  get FormFirstName() { return this.form.get('FormFirstName')?.value }
  get FormLastName() { return this.form.get('FormLastName')?.value }

  ngOnInit(): void {

    this.userService.LoggedInUser.pipe(take(1)).subscribe(user => {
      if (user) {
        console.log(user);
        this.router.navigate(['/auth/']);
      }
    });

  }

  public async IsEmailAllowed() {

    let email = this.FormEmail;

    if (await this.userService.IsUserEmailPermitted(email)) {

      this.emailAllowed = true;
      this.PatchForm();

    }
    else {
      this.errorMessage = "You are not permitted to sign up. Try again or contact your system administrator."
    }
  }

  public async SignUp() {

    let credentials = {
      Email: this.FormUsername,
      Password: this.FormPassword
    } as Credentials;

    let fName = this.FormFirstName;
    let lName = this.FormLastName;

    if (await this.userService.SignUpWithEmailAndPassword(credentials, fName, lName)) {
      //this.router.navigate(['/auth/']);
    }
    else {
      this.errorMessage = "Your registration could not be completed at this time. Please contact your system administrator."
      this.Cancel();
    }
  }

  public Cancel() {
    this.Initialize();
  }

  private Initialize() {
    this.emailAllowed = false;

    this.emailForm = this.formBuilder.group({ 'FormEmail': [{ value: '', disabled: false }, [Validators.required]] });

    this.form = this.formBuilder.group({
      'FormUsername': [{ value: '', disabled: true }, [Validators.required]],
      'FormPassword': [{ value: '', disabled: false }, [Validators.required]],
      'FormFirstName': [{ value: '', disabled: false }, [Validators.required]],
      'FormLastName': [{ value: '', disabled: false }, [Validators.required]]
    });
  }

  private PatchForm() {
    this.form.patchValue({ FormUsername: this.FormEmail });
  }

}
