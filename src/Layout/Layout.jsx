import Header from '../components/ui/Header/Header';
import { useContext } from 'react';
import { AuthStateContext } from '../providers/AuthStateProvider';
import Auth from '../components/pages/Auth';

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
