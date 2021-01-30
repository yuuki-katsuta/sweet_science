import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { db } from '../base';
import MatchInformation from './MatchInformation';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const Home = ({ history }) => {
  const { adminUser } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);

  //取得
  const fetchChats = () => {
    return db
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        const newChats = [];
        querySnapshot.forEach((doc) => {
          newChats.push(doc.id);
        });
        return newChats;
      });
  };

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const chatNames = await fetchChats();
      //アンマウントされていなければステートを更新
      if (!unmounted) {
        setMatches(chatNames);
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
      <div style={{ height: '60vh', overflow: 'scroll' }}>
        <List component='nav' aria-label='secondary mailbox folders'>
          {matches.map((match, index) => {
            return (
              <ListItem button alignItems='center' key={index}>
                <ListItemText
                  primary={<Typography align='center'>{match}</Typography>}
                  onClick={() => {
                    history.push({
                      pathname: `/chat/${index}`,
                      state: { match: match },
                    });
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </div>
      <Divider />
      {adminUser && (
        <MatchInformation fetchChats={fetchChats} setMatches={setMatches} />
      )}
    </div>
  );
};
export default Home;
