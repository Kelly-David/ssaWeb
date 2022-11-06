import { Strings } from '../shared/strings';
import { Injectable } from '@angular/core';
import { FirestoreService } from './firstore.service';
import { PermittedEmail } from '../shared/models/permittedEmail';
import { firstValueFrom } from 'rxjs';
import { User } from '../shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestoreService: FirestoreService
  ) { }

  public async IsUserEmailPermitted(email: string): Promise<boolean> {
    
    const query = this.firestoreService.doc$<PermittedEmail>(`${Strings.PermittedEmailsCollection}/${email}`);

    const emailAddress = await firstValueFrom(query);

    if (emailAddress != null && !emailAddress.SignedUp) return true;

    return false;
  }

  public async GetPermittedEmailData(email: string): Promise<PermittedEmail | null> {
    
    const query = this.firestoreService.doc$<PermittedEmail>(`${Strings.PermittedEmailsCollection}/${email}`);

    const emailAddress = await firstValueFrom(query);

    if (emailAddress != null) return emailAddress;

    return null;
  }

  public SetupNewUser(user: User) {

    return this.firestoreService.insertOne<User>(`${Strings.UsersCollection}`, user);
  }

  public SetPermittedEmailSignedUp(emailAddress: string) {

    let email: PermittedEmail = { Id: emailAddress, Email: emailAddress, SignedUp: true };

    return this.firestoreService.updateOne<PermittedEmail>(`${Strings.PermittedEmailsCollection}`, email);
  }


}
