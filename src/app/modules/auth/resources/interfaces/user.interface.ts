import { Role } from '../enums/role.enum';

export interface UserInterface {
  email: string;
  exp: number;
  role: Role[];
  userId: string;
}
