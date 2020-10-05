export interface AuthState {
  user: firebase.User; //firebase user model
  isLoggedIn: boolean;
  isAdmin: boolean;
  isAdvanced: boolean;
  isDistributor: boolean;
  // expirationDate: number;
  error: any;
}

export const authInitialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isAdmin: false,
  isAdvanced: false,
  isDistributor: false,
  // expirationDate: -1,
  error: null
};


export class User {
  constructor(
    public email: string,
    public password: string
  ) {
  }
}

export interface UserClaim {
  user: firebase.User;
  isAdmin: boolean;
  isAdvanced: boolean;
  isDistributor: boolean;
  // expirationDate: number;
}
