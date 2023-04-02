import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  public form: FormGroup;
  public errorMessage: string | undefined;
  public resetSent: boolean;

  public infoMessage = "A password reset link has been sent to your email. Make sure to check your spam folder!"

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { 

    this.resetSent = false;

    this.form = this.formBuilder.group({
      'FormEmail' : [{ value: '', disabled: false}, [Validators.required, Validators.email]]
    })
  }

  get FormEmail() { return this.form.get('FormEmail')?.value }


  ngOnInit(): void {
  }

  public async Submit() {
    let result = await this.userService.ResetPassword(this.FormEmail);

    if (result) {
      this.errorMessage = result;
    }
    else {
      this.resetSent = true;
    }
  }

}
