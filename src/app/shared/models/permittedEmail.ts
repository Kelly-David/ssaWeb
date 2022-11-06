import { UserRoles } from './user';
export interface PermittedEmail {
    Id: string;
    Email: string;
    SignedUp: boolean;
    Roles?: UserRoles
}
