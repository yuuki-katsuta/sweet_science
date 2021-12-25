import { createContext, useEffect, useState } from 'react';
import { auth } from '../base';

export const AuthStateContext = createContext();
export const AuthStateProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [adminUser, setAdminUser] = useState(false);
  const [guestUser, setGuestUser] = useState(false);

  //認証状態の変化を監視
  useEffect(() => {
    setIsLoading(true);
    //認証されていれば user オブジェクトに値が設定され、未認証であれば、null が設定される
    //ログイン状態が変化すると呼び出される
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult(true).then((idTokenResult) => {
          if (idTokenResult.claims.admin) setAdminUser(true);
          if (idTokenResult.claims.provider_id === 'anonymous')
            setGuestUser(true);
        });
      } else {
        setAdminUser(false);
        setGuestUser(false);
      }
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

  return (
    //AuthProviderのchildren内で認証ロジックが使える
    <AuthStateContext.Provider
      value={{
        currentUser,
        isLoading,
        adminUser,
        guestUser,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};
