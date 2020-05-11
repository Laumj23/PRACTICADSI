export interface Role {
  user?: boolean;
  doctor?: boolean;
}
export interface UserI {
  uid: string;
  email: string;
  role: Role;
  password?: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
}
