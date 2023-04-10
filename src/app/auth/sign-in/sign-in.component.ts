import { Credentials } from '../../models/credentials';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public form: FormGroup;
  public error: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    this.form = this.formBuilder.group({
      'FormUsername' : [{ value: '', disabled: false }, [Validators.required]],
      'FormPassword' : [{ value: '', disabled: false }, [Validators.required]]
    });
  }

  get FormUsername() { return this.form.get('FormUsername')?.value }
  get FormPassword() { return this.form.get('FormPassword')?.value }

  ngOnInit(): void {

    this.userService.LoggedInUser.pipe(take(1)).subscribe(user => {
      if (user) {
        console.log(user);
        this.router.navigate(['/auth/']);
      }
    });
  }

  public async Submit() {

    let credentials = {
      Email: this.FormUsername.toLowerCase(),
      Password: this.FormPassword
    } as Credentials;

    try {
      await this.userService.SignInWithEmailAndPassword(credentials).then(
        _ => this.router.navigate(['/auth/'])
      );
    }
    catch (exception: any) {
      this.error = 'Username or password is incorrect';
    }
  }
}
