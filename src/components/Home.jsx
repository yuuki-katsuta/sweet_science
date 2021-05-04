import { useContext, useEffect, useState, memo } from 'react';
import { RootContext } from '../Provider';
import { db } from '../base';
import MediaQuery from 'react-responsive';
import MatchList from './MatchList';
import News from './News';
import MatchInformationAddField from './Add/MatchInformationAddField';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';

const SDescription = styled.div`
  margin-bottom: 16px;
  color: #666666;
  font-weight: bold;
`;
const SAddMatchSectionStyle = styled.div`
  margin: 50px 0 60px;
`;
const SNewsSection = styled.div`
  width: 100%;
  margin: 56px auto 0;
  text-align: center;
`;

const Home = memo(() => {
  const { adminUser } = useContext(RootContext);
  const [matchData, setMatchData] = useState([]);

  //試合情報を取得
  const getMatcheInformation = async () => {
    const querySnapshot = await db
      .collection('chats')
      .orderBy('date', 'desc')
      .get();
    const newMatcheInformation = [];
    querySnapshot.forEach((doc) => {
      newMatcheInformation.push(doc.data());
    });
    return newMatcheInformation;
  };

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const matchData = await getMatcheInformation();
      //アンマウントされていなければステートを更新
      if (!unmounted) {
        setMatchData(matchData);
      }
    })();
    //クリーンアップ関数を返す
    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      <h2 className='section-title'>Boxing Fights</h2>
      <SDescription>
        <p>
          ボクシングの試合一覧を表示しています。
          <br />
          クリックすると各チャットページへ遷移します。
        </p>
      </SDescription>
      <MatchList matchData={matchData} />
      {adminUser ? (
        <>
          <MediaQuery query='(max-width: 840px)'>
            <Divider />
            <News matchData={matchData} />
          </MediaQuery>
          <MediaQuery query='(min-width: 841px)'>
            <Container maxWidth='md'>
              <SAddMatchSectionStyle>
                <Divider />
                <MatchInformationAddField
                  getMatcheInformation={getMatcheInformation}
                  setMatchData={setMatchData}
                />
              </SAddMatchSectionStyle>
            </Container>
          </MediaQuery>
        </>
      ) : (
        <Container maxWidth='md'>
          <SNewsSection>
            <Divider />
            <News matchData={matchData} />
          </SNewsSection>
        </Container>
      )}
    </div>
  );
});
export default Home;
