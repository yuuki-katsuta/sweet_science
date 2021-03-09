import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { db } from '../base';
import MatchList from './MatchList';
import News from './News';
import AddMatchInformation from './Add/AddMatchInformation';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

const Home = ({ history }) => {
  const { adminUser } = useContext(AuthContext);
  const [matchData, setMatchData] = useState([]);

  //試合情報を取得
  const getMatcheInformation = () => {
    return db
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        const newMatcheInformation = [];
        querySnapshot.forEach((doc) => {
          newMatcheInformation.push(doc.data());
        });
        return newMatcheInformation;
      });
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
    <div class='container'>
      <h2 style={{ fontFamily: 'Arimo' }}>Match List</h2>
      <MatchList history={history} matchData={matchData} />
      {adminUser ? (
        <Container maxWidth='md'>
          <div style={{ margin: '50px 0 60px' }}>
            <Divider />
            <AddMatchInformation
              getMatcheInformation={getMatcheInformation}
              setMatchData={setMatchData}
            />
          </div>
        </Container>
      ) : (
        <Container maxWidth='md'>
          <div
            style={{
              width: '100%',
              margin: '72px auto 0',
              textAlign: 'center',
            }}
          >
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
};
export default Home;
