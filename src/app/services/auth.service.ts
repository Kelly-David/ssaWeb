import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Credentials } from '../shared/models/credentials';
import { UserService } from './user.service';
import { User, UserRoles } from '../shared/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirestoreService } from './firstore.service';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;
  public authError: Observable<string>;
  private authErrorSource = new BehaviorSubject('');

  constructor(
    private angularFireAuth: AngularFireAuth,
    private userService: UserService,
    private firestoreService: FirestoreService
  ) {

    this.user = this.firestoreService.GetAuthState();

    this.authError = this.authErrorSource.asObservable();
  }

  public async SignUpWithEmailAndPassword(credentials: Credentials, firstName: string, lastName: string): Promise<boolean> {

    if (this.ValidateCredentials(credentials)) {

      if (await this.userService.IsUserEmailPermitted(credentials.Email)) {

        try {

          const result = await this.angularFireAuth.createUserWithEmailAndPassword(credentials.Email, credentials.Password);

          if (result?.user) {

            let authUser = result?.user;

            let emailData = await this.userService.GetPermittedEmailData(authUser.email!);

            let roles = emailData != null && emailData.Roles != undefined ? emailData.Roles : {Reader: true, Editor: true, Admin: false};

            const user = new User(authUser.uid, firstName, lastName, authUser.email!, roles);

            await this.userService.SetupNewUser(user);

            await this.userService.SetPermittedEmailSignedUp(credentials.Email);

            return true;
          }

        } catch (error) {

          console.log((error as Error).message)
        }
      }
    }
    return false;
  }

  public async SignInWithEmailAndPassword(credentials: Credentials): Promise<boolean> {

    if (this.ValidateCredentials(credentials)) {

      const result = await this.angularFireAuth.signInWithEmailAndPassword(credentials.Email, credentials.Password);

      if (result?.user != null) {

        console.log(result.user)

        return true;
      }
    }

    return false;
  }

  public async ResetPassword(email: string): Promise<string> {

    return await this.angularFireAuth.sendPasswordResetEmail(email)
    .catch(error => {
      return error
    });

  }

  public SignOut(): Promise<void> {
    return this.angularFireAuth.signOut();
  }

  private CheckUserAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }

    for (const role of allowedRoles) {

        if (user.Roles[role as keyof UserRoles]) {

          return true;
        }
    }
    return false;
  }

  public CanRead(user: User): boolean {
    const allowed = ['Reader'];
    return this.CheckUserAuthorization(user, allowed);
  }

  public CanEdit(user: User): boolean {
    const allowed = ['Admin', 'Editor'];
    return this.CheckUserAuthorization(user, allowed);
  }

  public CanDelete(user: User): boolean {
    const allowed = ['Admin'];
    return this.CheckUserAuthorization(user, allowed);
  }

  private ValidateCredentials(credentials: Credentials): boolean {

    if (!Boolean(credentials.Email) || !Boolean(credentials.Password)) {
      return false;
    }

    return true;
  }


}
