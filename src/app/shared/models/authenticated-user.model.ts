export interface AuthenticatedUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description: string;
  salt: string;
  token: string;
}