import Header from '../components/ui/Header/Header';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Auth from '../components/pages/Auth';
import { auth } from '../base';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentUserState,
  guestUserState,
  adminUserState,
} from '../store/authState';
import Footer from '../components/ui/footer/Footer';
import MediaQuery from 'react-responsive';
import { media } from '../components/ui/Utils/style-utils';

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setAdminUser = useSetRecoilState(adminUserState);
  const setGuestUser = useSetRecoilState(guestUserState);

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
  }, [setAdminUser, setCurrentUser, setGuestUser]);

  if (isLoading)
    return (
      <SWrapper>
        <CircularProgress />
      </SWrapper>
    );
  return currentUser ? (
    <div>
      <Header />
      <SMain>{children}</SMain>
      <MediaQuery query='(min-width: 581px)'>
        <Footer />
      </MediaQuery>
    </div>
  ) : (
    <Auth />
  );
};
const SMain = styled.div`
  ${media.handheld581`
    padding-bottom: 28px;
  `}
`;
const SWrapper = styled.div`
  margin-top: 180px;
  text-align: center;
`;
export default Layout;
