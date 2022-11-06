import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ssaWeb';

  constructor(
    private service: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    
    //this.userService.IsUserEmailPermitted('davidkelly.tlf@gmail.com').then((result) => console.log(result));

    //this.service.SignUpWithEmailAndPassword({Email: 'davidkelly.tlf@gmail.com', Password: 'Horse123'}, 'David', 'Kelly').then((result) => console.log(result));
  }
}
