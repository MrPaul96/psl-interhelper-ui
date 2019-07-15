import { Roles } from './roles.model';

export interface User {
    id: string;
    email: string;
    name: string;
    password?: string;
    job?: string;
    role: Roles;
}
