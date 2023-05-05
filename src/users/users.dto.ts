export interface CreateUser {
  name: string;
  email: string;
  roleId: number;
  password: string;
  avatarLink?: string;
}
