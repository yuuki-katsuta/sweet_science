import { atom } from 'recoil';

export const currentUserState = atom({
  key: 'auth/currentUser',
  default: null,
  dangerouslyAllowMutability: true,
});

export const guestUserState = atom({
  key: 'auth/guestUser',
  default: false,
});

export const adminUserState = atom({
  key: 'auth/adminUser',
  default: false,
});
