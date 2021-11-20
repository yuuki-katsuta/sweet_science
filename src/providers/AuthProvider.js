import { createContext } from 'react';
import { auth } from '../base';
import { useAlert } from 'react-alert';
import firebase from 'firebase/app';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const Alert = useAlert();
  //サインイン
  const signup = (email, password, confirmPassword, name) => {
    try {
      if (name.trim() === '') throw new Error('Please enter your name');
      if (name.length > 10)
        throw new Error('Please use no more than 10 characters');
      if (password !== confirmPassword)
        throw new Error('Passwords do not match');
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
          Alert.success('ログインしました！');
        })
        .catch((e) => {
          alert(e.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => Alert.show('ログアウトしました。'))
      .catch((e) => alert(e.message));
  };

  //再認証
  const Reauthentication = async (currentPassword) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    await auth.currentUser.reauthenticateWithCredential(credential);
  };

  //ログイン
  const login = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.success('ログインしました！');
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  const guestLogin = () => {
    auth
      .signInAnonymously()
      .then(() => {
        Alert.success('ゲストユーザーとしてログインしました！');
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  return (
    <AuthContext.Provider
      value={{ signup, login, guestLogin, signOut, Reauthentication }}
    >
      {children}
    </AuthContext.Provider>
  );
};
