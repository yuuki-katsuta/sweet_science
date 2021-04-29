import Header from '../Header/Header';
import { useContext } from 'react';

import { AuthContext } from '../../auth/AuthProvider';

const Layout = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <>{children}</>
  );
};
export default Layout;
