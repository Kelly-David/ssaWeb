import { Timestamp } from 'firebase/firestore';
import { Base } from './base';


export interface User extends Base {

    FirstName: string;
    LastName: string;
    Email: string;
    Permissions: UserPermissions;
    Role: UserRole;
}

export class User implements User{
    
    public Id: string;

    public FirstName: string;

    public LastName: string;

    public Email: string;

    public CreatedDateTime: any;

    public UpdatedDateTime?: any;

    public LastLoggedIn?: any;

    public IsArchived: boolean = false;

    public Permissions: UserPermissions;

    public Role: UserRole;

    constructor(user: User) {
        this.Id = user.Id ?? null;
        this.FirstName = user.FirstName ?? null;
        this.LastName = user.LastName ?? null;
        this.Email = user.Email ?? null;
        this.CreatedDateTime = user.CreatedDateTime ?? null;
        this.IsArchived = false;
        this.Permissions = user.Permissions ?? null ;
        this.Role = user.Role ?? null;
        this.UpdatedDateTime = user.UpdatedDateTime ?? null;
        this.LastLoggedIn = user.LastLoggedIn ?? null;
    }

    get GetHighestPermissions(): string {

        let permission = UserPermission.Reader;

        if (this.Permissions.Editor) permission = UserPermission.Editor;

        if (this.Permissions.Admin) permission = UserPermission.Admin;

        return permission.toString();
    }

    get GetCreatedDateString() : string {

        return (this.CreatedDateTime.toDate() as Date).toUTCString();
    }

    get GetUpdatedDateString() : string {
        
        return this.UpdatedDateTime != undefined ? (this.UpdatedDateTime.toDate() as Date).toUTCString() : this.GetCreatedDateString;
    }

    get GetLastLoggedInDateString() : string {
        
        return this.LastLoggedIn != undefined ? (this.LastLoggedIn.toDate() as Date).toUTCString() : "";
    }

    public get FullName() : string {
        return this.FirstName + ' ' + this.LastName;
    }

    get ToPlainObj() : object {
        return Object.assign({}, this);
    }
 }

export enum UserRole {

  Staff = "Staff",
  Parent = "Parent"
}

export enum UserPermission {

    Reader =  "Reader",
    Editor = "Editor",
    Admin = "Admin"
}

export interface UserPermissions {

    Reader: boolean;
    Editor: boolean;
    Admin: boolean;
}