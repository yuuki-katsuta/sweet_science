import Header from '../components/Header/Header';
import { useContext } from 'react';
import { AuthStateContext } from '../providers/AuthStateProvider';

const Layout = ({ children }) => {
  const { currentUser } = useContext(AuthStateContext);

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
