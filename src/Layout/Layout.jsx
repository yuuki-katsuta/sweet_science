import Header from '../components/Header/Header';
import { useContext } from 'react';
import { AuthStateContext } from '../providers/AuthStateProvider';
import Auth from '../components/Auth/Auth';

const Layout = ({ children }) => {
  const { currentUser } = useContext(AuthStateContext);

  return currentUser ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <Auth />
  );
};
export default Layout;
