import { Base } from './base';

export class User implements Base{
    
    public Id: string;

    public FirstName: string;

    public LastName: string;

    public Email: string;

    public CreatedDateTime: Date;

    public UpdatedDateTime?: Date;

    public IsArchived: boolean = false;

    public Roles: UserRoles;

    constructor(id: string, firstName: string, lastName: string, email: string, roles: UserRoles) {
        this.Id = id;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.CreatedDateTime = new Date();
        this.IsArchived = false;
        this.Roles = roles ?? {Reader: false, Editor: false, Admin: false} ;
    }
}

export interface UserRoles {

    Reader: boolean;
    Editor: boolean;
    Admin: boolean;
}