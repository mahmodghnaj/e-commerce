export interface LoginBody {
  email: string;
  password: string;
}
export interface RegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
}
