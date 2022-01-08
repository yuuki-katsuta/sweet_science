import Header from '../components/ui/Header/Header';
import { useContext } from 'react';
import { AuthStateContext } from '../providers/AuthStateProvider';
import Auth from '../components/pages/Auth';
import ScrollToTop from '../ScrollToTop';

const Layout = ({ children }) => {
  const { currentUser } = useContext(AuthStateContext);

  return currentUser ? (
    <>
      <ScrollToTop />
      <Header />
      {children}
    </>
  ) : (
    <Auth />
  );
};
export default Layout;
