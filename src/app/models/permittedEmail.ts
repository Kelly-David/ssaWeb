import { UserRole, UserPermissions } from './user';

export class PermittedEmail {
    public Id?: string;
    public Email: string;
    public SignedUp: boolean;
    public Role?: UserRole;
    public Permissions?: UserPermissions;
    public Offices: []

    constructor(user: any) {
        this.Id = user.Id ?? null;
        this.Email = user.Email ?? null;
        this.SignedUp = user.SignedUp ?? null;
        this.Role = user.Role ?? null;
        this.Permissions = user.Permissions ?? null;
        this.Offices = user.Offices?? [];
    }

    get ToPlainObj() : object {
      return Object.assign({}, this);
  }
}
