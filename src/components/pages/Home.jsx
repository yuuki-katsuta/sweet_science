import { adminUserState } from '../../store/authState';
import { useRecoilValue } from 'recoil';
import { media } from '../ui/Utils/style-utils';
import MediaQuery from 'react-responsive';
import MatchList from '../ui/Home/MatchList';
import News from '../ui/Home/News';
import MatchInformationAddField from '../ui/Home/Add/MatchInformationAddField';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { Suspense } from 'react';
import { ThreeDots, useLoading } from '@agney/react-loading';

const SDescription = styled.div`
  margin-bottom: 16px;
  color: #666666;
  font-weight: bold;
  _:lang(x) + _:-webkit-full-screen-document,
  p {
    letter-spacing: -1.5px;
  }
`;
const SAddMatchSectionStyle = styled.div`
  margin: 50px 0 60px;
`;
const SNewsSection = styled.div`
  width: 100%;
  margin: 56px auto 0;
  text-align: center;
`;
const SHelperText = styled.span`
  display: none;
  ${media.handheld580`
  display: block
  `}
`;

const Home = () => {
  const adminUser = useRecoilValue(adminUserState);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: (
      <div
        style={{
          marginTop: '100px',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        <ThreeDots width='50' />
      </div>
    ),
  });

  return (
    <>
      <div className='container'>
        <h2 className='section-title'>Boxing Fights</h2>
        <SDescription>
          <p>
            ボクシングの試合一覧を表示しています。
            <br />
            クリックすると各チャットページへ遷移します。
            <br />
            <SHelperText>(横にスクロールできます。)</SHelperText>
          </p>
        </SDescription>
        <Suspense
          fallback={<section {...containerProps}>{indicatorEl}</section>}
        >
          <MatchList />
          {adminUser ? (
            <>
              <MediaQuery query='(max-width: 840px)'>
                <Divider />
                <News />
              </MediaQuery>
              <MediaQuery query='(min-width: 841px)'>
                <Container maxWidth='md'>
                  <SAddMatchSectionStyle>
                    <Divider />
                    <MatchInformationAddField />
                  </SAddMatchSectionStyle>
                </Container>
              </MediaQuery>
            </>
          ) : (
            <Container maxWidth='md'>
              <SNewsSection>
                <Divider />
                <News />
              </SNewsSection>
            </Container>
          )}
        </Suspense>
      </div>
    </>
  );
};
export default Home;
