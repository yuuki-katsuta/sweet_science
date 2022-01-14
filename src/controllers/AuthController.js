import { auth } from '../base';
import firebase from 'firebase/app';

//サインイン
export const signup = (email, password, confirmPassword, name, Alert) => {
  try {
    if (name.trim() === '') throw new Error('Please enter your name');
    if (name.length > 10)
      throw new Error('Please use no more than 10 characters');
    if (password !== confirmPassword) throw new Error('Passwords do not match');
    //新しいアカウントが作成されると、そのユーザーは自動的にログイン
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        const user = auth.currentUser;
        await user.updateProfile({
          displayName: name,
          email: email,
          password: password,
          photoURL: '',
        });
        Alert.success('ログインしました!');
      })
      .catch((e) => {
        alert(e.message);
      });
  } catch (error) {
    alert(error.message);
  }
};

export const signOut = (Alert) => {
  auth
    .signOut()
    .then(() => Alert.show('ログアウトしました。'))
    .catch((e) => alert(e.message));
};

//再認証
export const Reauthentication = async (currentPassword) => {
  const credential = firebase.auth.EmailAuthProvider.credential(
    auth.currentUser.email,
    currentPassword
  );
  await auth.currentUser.reauthenticateWithCredential(credential);
};

//ログイン
export const login = (email, password, Alert) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => Alert.success('ログインしました!'))
    .catch((e) => {
      alert(e.message);
    });
};

export const guestLogin = (Alert) => {
  auth
    .signInAnonymously()
    .then(() => Alert.success('ゲストユーザーとしてログインしました!'))
    .catch((e) => {
      alert(e.message);
    });
};
