import React, { useEffect, useState } from 'react';
import { auth } from '../base.js';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [adminUser, setAdminUser] = useState(false);

  //ログイン
  const login = async (email, password, history) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      alert(error.message);
    }
  };

  //サインイン
  const signup = async (email, password, confirmPassword, name, history) => {
    try {
      if (name === '') throw new Error('Please enter your name');
      if (name.length > 10)
        throw new Error('Please use no more than 10 characters');
      if (password !== confirmPassword)
        throw new Error('Passwords do not match');
      //新しいアカウントが作成されると、そのユーザーは自動的にログイン
      await auth.createUserWithEmailAndPassword(email, password);
      //現在ログインしているユーザーを取得するには、currentUser プロパティを使用
      const user = auth.currentUser;
      //プロフィール設定
      await user.updateProfile({
        displayName: name,
        email: email,
      });
      history.push('/');
    } catch (error) {
      alert(error.message);
    }
  };

  //displayname変更
  const changeCurrentName = async (newName, setName) => {
    try {
      if (newName.length > 10)
        throw new Error('Please use no more than 10 characters');
      await auth.currentUser.updateProfile({
        displayName: newName,
      });
      alert('Updated the name');
    } catch (error) {
      alert(error.message);
      setName('');
    }
  };

  //email変更
  const changeCurrentEmail = async (newEmail, setEmail) => {
    try {
      await auth.currentUser.updateEmail(newEmail);
      alert('Updated the email');
    } catch (error) {
      setEmail('');
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
        });
      }
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

  return (
    //AuthProviderのchildren内で認証ロジックが使える
    <AuthContext.Provider
      value={{
        login: login,
        signup: signup,
        currentUser,
        isLoading,
        adminUser,
        setAdminUser,
        changeCurrentName,
        changeCurrentEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
