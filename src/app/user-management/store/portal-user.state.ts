export interface UserState {
  id?: string;
  email?: string;
  name?: string;
  picture?: string;
  loggedInUser?: any;
}

export const portalUserInitialState: UserState = {
  email: '',
  name: ''
};
