import { useContext } from 'react';
import { AuthStateContext } from '../../providers/AuthStateProvider';
import { media } from '../ui/Utils/style-utils';
import MediaQuery from 'react-responsive';
import MatchList from '../ui/Home/MatchList';
import News from '../ui/Home/News';
import MatchInformationAddField from '../ui/Home/Add/MatchInformationAddField';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';

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
  const { adminUser } = useContext(AuthStateContext);

  return (
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
    </div>
  );
};
export default Home;
