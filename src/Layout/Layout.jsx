import Header from '../components/Header/Header';
import { useContext } from 'react';
import { RootContext } from '../Provider';

const Layout = ({ children }) => {
  const { currentUser } = useContext(RootContext);

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
