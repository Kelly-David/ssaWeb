import { Credentials } from './../../shared/models/credentials';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private authService: AuthService,
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

    this.authService.user.pipe(take(1)).subscribe(user => {
      if (user) {
        console.log(user);
        this.router.navigate(['/auth/']);
      }
    });
  }

  public async Submit() {

    let credentials = {
      Email: this.FormUsername,
      Password: this.FormPassword
    } as Credentials;

    try {
      await this.authService.SignInWithEmailAndPassword(credentials).then(
        _ => this.router.navigate(['/auth/'])
      );
    }
    catch (exception: any) {
      console.log(exception);
    }
  }
}
