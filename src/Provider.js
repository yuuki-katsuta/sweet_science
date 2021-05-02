import { createContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { auth } from './base.js';
import { useAlert } from 'react-alert';
export const RootContext = createContext();

export const Provider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [adminUser, setAdminUser] = useState(false);
  const [guestUser, setGuestUser] = useState(false);
  const Alert = useAlert();

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

  const guestLogin = async () => {
    await auth
      .signInAnonymously()
      .then(() => {
        Alert.success('ゲストユーザーとしてログインしました！');
      })
      .catch((e) => {
        alert(e.message);
      });
  };

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
      .then(() => {
        setAdminUser(false);
        setGuestUser(false);
        Alert.show('ログアウトしました。');
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  //再認証
  const Reauthentication = async (currentPassword) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    await auth.currentUser
      .reauthenticateWithCredential(credential)
      .catch((e) => {
        alert(e.message);
      });
  };

  //displayname変更
  const changeCurrentName = async (newName) => {
    try {
      if (newName.length > 10)
        throw new Error('Please use no more than 10 characters');
      if (newName.trim() === '') throw new Error('Please enter your name');
      await auth.currentUser.updateProfile({
        displayName: newName,
      });
      alert('Updated the name');
    } catch (error) {
      alert(error.message);
    }
  };

  //email変更
  const changeCurrentEmail = async (currentPassword, newEmail) => {
    try {
      await Reauthentication(currentPassword);
      await auth.currentUser.updateEmail(newEmail);
      alert('Updated the email');
    } catch (error) {
      alert(error.message);
    }
  };

  //password変更
  const ChangeCurrentPassword = async (
    currentPassword,
    newPassword,
    confirmPassword
  ) => {
    try {
      if (newPassword !== confirmPassword)
        throw new Error('Passwords do not match');
      await Reauthentication(currentPassword);
      await auth.currentUser.updatePassword(newPassword);
      alert('Updated the password');
    } catch (error) {
      alert(error.message);
    }
  };

  const ChangePhtoUrl = async (imageURL) => {
    try {
      const user = auth.currentUser;
      await user.updateProfile({
        photoURL: imageURL,
      });
      Alert.success('プロフィール画像を変更しました！');
    } catch (error) {
      alert(error.message);
    }
  };

  const ResetPhtoUrl = () => {
    try {
      const user = auth.currentUser;
      user.updateProfile({
        photoURL: '',
      });
    } catch (error) {
      alert(error.message);
    }
  };

  //認証状態の変化を監視
  useEffect(() => {
    setIsLoading(true);
    //認証されていれば user オブジェクトに値が設定され、未認証であれば、null が設定される
    //ログイン状態が変化すると呼び出される
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult(true).then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            setAdminUser(true);
          }
          if (idTokenResult.claims.provider_id === 'anonymous') {
            setGuestUser(true);
          }
        });
      }
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

  return (
    //AuthProviderのchildren内で認証ロジックが使える
    <RootContext.Provider
      value={{
        login: login,
        signup: signup,
        currentUser,
        isLoading,
        adminUser,
        changeCurrentName,
        changeCurrentEmail,
        ChangeCurrentPassword,
        ChangePhtoUrl,
        ResetPhtoUrl,
        guestLogin,
        guestUser,
        signOut,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
