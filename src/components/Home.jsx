import { useContext, useEffect, useState, memo } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { db } from '../base';
import MediaQuery from 'react-responsive';
import MatchList from './MatchList';
import News from './News';
import AddMatchInformation from './Add/AddMatchInformation';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

const descriptionStyle = {
  marginBottom: '14px',
  color: '#666666',
  fontWeight: 'bold',
};
const addMatchSectionStyle = { margin: '50px 0 60px' };
const newsSectionStyle = {
  width: '100%',
  margin: '56px auto 0',
  textAlign: 'center',
};

const Home = memo(() => {
  const { adminUser } = useContext(AuthContext);
  const [matchData, setMatchData] = useState([]);

  //試合情報を取得
  const getMatcheInformation = async () => {
    const querySnapshot = await db
      .collection('chats')
      .orderBy('createdAt', 'desc')
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
      const matchInformation = await getMatcheInformation();
      //アンマウントされていなければステートを更新
      if (!unmounted) {
        setMatchData(matchInformation);
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
      <div style={descriptionStyle}>
        <p>
          ボクシングの試合一覧を表示しています。
          <br />
          クリックすると各チャットページへ遷移します。
        </p>
      </div>
      <MatchList matchData={matchData} />
      {adminUser ? (
        <>
          <MediaQuery query='(max-width: 800px)'>
            <Divider />
            <News
              title={matchData.title}
              creationTime={matchData.createdAt}
              matchData={matchData}
            />
          </MediaQuery>
          <MediaQuery query='(min-width: 801px)'>
            <Container maxWidth='md'>
              <div style={addMatchSectionStyle}>
                <Divider />
                <AddMatchInformation
                  getMatcheInformation={getMatcheInformation}
                  setMatchData={setMatchData}
                />
              </div>
            </Container>
          </MediaQuery>
        </>
      ) : (
        <Container maxWidth='md'>
          <div style={newsSectionStyle}>
            <Divider />
            <News
              title={matchData.title}
              creationTime={matchData.createdAt}
              matchData={matchData}
            />
          </div>
        </Container>
      )}
    </div>
  );
});
export default Home;
