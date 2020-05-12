export interface Roles {
  user?: boolean;
  doctor?: boolean;
}
export interface UserI {
  uid: string;
  email: string;
  roles: Roles;
  centro?: string;
  password?: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
}
