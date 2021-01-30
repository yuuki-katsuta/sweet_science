import React, { useEffect, useState } from 'react';
import { auth } from '../base.js';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //ログイン
  const login = async (email, password, history) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  //サインイン
  const signup = async (email, password, name, history) => {
    try {
      //新しいアカウントが作成されると、そのユーザーは自動的にログイン
      await auth.createUserWithEmailAndPassword(email, password);
      //現在ログインしているユーザーを取得するには、currentUser プロパティを使用
      const user = auth.currentUser;
      //プロフィール設定
      await user.updateProfile({
        displayName: name,
      });
      history.push('/');
    } catch (error) {
      alert(error);
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
          console.log(idTokenResult.claims);
          if (idTokenResult.claims.admin) {
            console.log('claims.admin');
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
