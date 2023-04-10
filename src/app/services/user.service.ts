import { Strings } from '../shared/strings';
import { Injectable } from '@angular/core';
import { PermittedEmail } from '../shared/models/permittedEmail';
import { Observable, from, of } from 'rxjs';
import { User, UserPermissions, UserRole } from '../shared/models/user';
import { map, switchMap, take } from 'rxjs/operators';
import { Credentials } from '../shared/models/credentials';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Firestore, doc, DocumentSnapshot, getDoc, updateDoc, addDoc, where, query, collectionData, collection, DocumentData, setDoc, orderBy, startAt, limit, QueryConstraint, getDocs } from '@angular/fire/firestore';
import { Auth, user, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, UserCredential, fetchSignInMethodsForEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public LoggedInUser: Observable<User | null>;

  constructor(private firestore: Firestore, private auth: Auth) {
    this.LoggedInUser = this.GetLoggedInUser();
  }

  // region Public Methods -----------------------------------------------------------------------------------------------

  /// Fetch the logged in user from the Users collection
  private GetLoggedInUser() {

    const authUser = user(this.auth);

    return authUser.pipe(switchMap(user => {
      if (user) {
        const userDocument = doc(this.firestore, Strings.UsersCollection, user.uid);
        const docSnap = getDoc(userDocument);
        return docSnap.then((value: DocumentSnapshot) => {
          if (value.exists()) {
            let userDoc = value.data() as User;
            return new User(userDoc);
          }
          else {
            return null;
          }
        })
      }
      return of(null) as Observable<null>;
    }))
  }

  /// Query the Users collection
  public GetUsersAsync(role: string, startIndex: number = 0, lim: number = 20, isArchived: boolean = false,
    offices: string[] = [], includeAdmin: boolean = false): Observable<User[]> {

    const usersCollection = collection(this.firestore, Strings.UsersCollection);

    var constraints: QueryConstraint[] = []

    constraints.push(where("IsArchived", "==", isArchived));
    constraints.push(where("Role", "==", role));

    if (includeAdmin)
      constraints.push(where("Permissions.Admin", "==", includeAdmin));

    constraints.push(where("Permissions.Editor", "==", true));

    constraints.push(where("Offices", "array-contains-any", offices));

    constraints.push(orderBy("FirstName"));
    constraints.push(startAt(startIndex));
    constraints.push(limit(lim));

    const userQuery = query(usersCollection, ...constraints);

    return collectionData(userQuery).pipe(map(documents => {
      let users = documents;
      return users.map(document => {
        return new User(document as User);
      })
    }));
  }

  /// Fetch the PermittedEmails collection
  public GetPermittedEmailsAsync() {

    const collectionRef = collection(this.firestore, Strings.PermittedEmailsCollection);

    return collectionData(collectionRef).pipe(map(docs => {
      let users = docs as DocumentChangeAction<PermittedEmail>[];
      return users.map(doc => {
        let user = doc.payload.doc.data() as PermittedEmail;
        return user as PermittedEmail;
      })
    }))
  }

  /// Returns true if the user email is permitted
  public async IsUserEmailPermitted(email: string): Promise<boolean> {

    const docRef = doc(this.firestore, Strings.PermittedEmailsCollection, email);
    const docSnap = await getDoc(docRef);
    const emailAddress = docSnap.data();

    if (emailAddress != null && !emailAddress.SignedUp) return true;

    return false;
  }

  public async UserEmailExists(email: string): Promise<boolean> {

    const docRef = doc(this.firestore, Strings.PermittedEmailsCollection, email);
    const docSnap = await getDoc(docRef);
    const emailAddress = docSnap.data();

    if (emailAddress != null) return true;

    const collectionRef = collection(this.firestore, Strings.UsersCollection);
    const userQuery = query(collectionRef, where("Email", "==", email));

    const usersData = await getDocs(userQuery);

    let users = usersData.docs;

    if (users.length > 0) return true;

    return false;
  }

  /// Fetch a PermittedEmail by Email Address
  public async GetPermittedEmailData(email: string): Promise<PermittedEmail | null> {

    const docRef = doc(this.firestore, Strings.PermittedEmailsCollection, email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      return docSnap.data() as PermittedEmail;
    }
    return null;
  }

  /// Create a new auth User and User in the User collection
  public async SignUpWithEmailAndPassword(credentials: Credentials, firstName: string, lastName: string): Promise<boolean> {

    if (this.ValidateCredentials(credentials)) {

      if (await this.IsUserEmailPermitted(credentials.Email)) {

        try {
          let result!: UserCredential | undefined;

          result = await createUserWithEmailAndPassword(this.auth, credentials.Email, credentials.Password);

          if (result?.user) {
            let authUser = result?.user;
            let emailData = await this.GetPermittedEmailData(authUser.email!);

            let role = emailData != null && emailData.Role != undefined ? emailData.Role : UserRole.Staff;
            let permissions = emailData != null && emailData.Permissions != undefined ? emailData.Permissions : { Reader: true, Editor: true, Admin: false };

            let model = {
              Id: authUser.uid,
              FirstName: firstName,
              LastName: lastName,
              Email: authUser.email,
              Permissions: permissions,
              Role: role,
              CreatedDateTime: new Date(),
              Offices: emailData?.Offices
            } as User;

            const user = new User(model);
            this.SetupNewUser(user);
            this.SetPermittedEmailSignedUp(credentials.Email);
            return true;
          }

        } catch (error) {
          console.log((error as Error).message)
          return false;
        }
      }
    }
    return false;
  }

  /// Sign In a User with Email and Password
  public async SignInWithEmailAndPassword(credentials: Credentials): Promise<boolean> {

    if (this.ValidateCredentials(credentials)) {

      const result = await signInWithEmailAndPassword(this.auth, credentials.Email, credentials.Password);

      if (result?.user != null) {

        let user = result.user;

        await this.UpdateUser(user.uid, { LastLoggedIn: new Date() })

        return true;
      }
    }

    return false;
  }

  /// Send a password reset email
  public async ResetPassword(email: string): Promise<string> {

    return await sendPasswordResetEmail(this.auth, email)
      .catch(error => {
        return error
      });
  }

  /// Sign Out a User
  public SignOut(): Promise<void> {
    return signOut(this.auth);
  }

  /// Check is a user has read access
  public CanRead(user: User): boolean {
    const allowed = ['Reader'];
    return this.CheckUserAuthorization(user, allowed);
  }

  /// Check if user has editor access
  public CanEdit(user: User): boolean {
    const allowed = ['Admin', 'Editor'];
    return this.CheckUserAuthorization(user, allowed);
  }

  /// Check if user has admin access
  public CanDelete(user: User): boolean {
    const allowed = ['Admin'];
    return this.CheckUserAuthorization(user, allowed);
  }

  public async InsertPermittedEmail(user: PermittedEmail): Promise<boolean> {

    const docRef = doc(this.firestore, Strings.PermittedEmailsCollection, user.Id!);

    try {
      await setDoc(docRef, <PermittedEmail>user.ToPlainObj);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // region Private Methods -----------------------------------------------------------------------------------------------

  private CheckUserAuthorization(user: User, allowedPermissions: string[]): boolean {
    if (!user) {
      return false;
    }

    for (const role of allowedPermissions) {

      if (user.Permissions[role as keyof UserPermissions]) {

        return true;
      }
    }
    return false;
  }

  private ValidateCredentials(credentials: Credentials): boolean {

    if (!Boolean(credentials.Email) || !Boolean(credentials.Password)) {
      return false;
    }

    return true;
  }

  private SetupNewUser(user: User) {

    const docRef = doc(this.firestore, Strings.UsersCollection, user.Id);

    setDoc(docRef, <User>user.ToPlainObj);
  }

  private SetPermittedEmailSignedUp(emailAddress: string) {

    const docRef = doc(this.firestore, Strings.PermittedEmailsCollection, emailAddress);

    updateDoc(docRef, { Id: emailAddress, Email: emailAddress, SignedUp: true });
  }

  private async UpdateUser(userId: string, data: {}) {

    const docRef = doc(this.firestore, Strings.UsersCollection, userId);

    await updateDoc(docRef, data);
  }

}

