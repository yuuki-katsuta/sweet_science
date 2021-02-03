import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { db } from '../base';
import MatchList from './MatchList';
import AddMatchInformation from './AddMatchInformation';
import Divider from '@material-ui/core/Divider';

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
        const newChats = [];
        querySnapshot.forEach((doc) => {
          newChats.push(doc.data());
        });
        return newChats;
      });
  };

  const updateMatchInformation = (matchInformation) => {
    const newMatchInformation = [];
    matchInformation.forEach((match, index) => {
      newMatchInformation.push({
        id: index,
        title: `${match.fighter1} vs ${match.fighter2}`,
        date: match.date,
        division: match.division,
        fighter1: match.fighter1,
        fighter2: match.fighter2,
        videoId: match.url.split('v=')[1],
      });
    });
    return newMatchInformation;
  };

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const matchInformation = await getMatcheInformation();
      //試合情報を追加
      const newMatchInformation = updateMatchInformation(matchInformation);

      //アンマウントされていなければステートを更新
      if (!unmounted) {
        setMatchData(newMatchInformation);
      }
    })();
    //クリーンアップ関数を返す
    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>試合一覧</h2>
      <MatchList history={history} matchData={matchData} />
      {adminUser && (
        <div style={{ margin: '50px 0 60px' }}>
          <Divider />
          <AddMatchInformation
            getMatcheInformation={getMatcheInformation}
            setMatchData={setMatchData}
            updateMatchInformation={updateMatchInformation}
          />
        </div>
      )}
    </div>
  );
};
export default Home;
