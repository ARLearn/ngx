export interface UserState {
  fullId?: string;
  email?: string;
  name?: string;
  picture?: string;
  expirationDate?: number;
  // loggedInUser?: any;
}

export const portalUserInitialState: UserState = {
  email: '',
  name: ''
};
