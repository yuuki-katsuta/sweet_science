import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { db } from '../base';

const Home = ({ history }) => {
  const { adminUser } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [matchName, setMatchName] = useState('');

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

  //追加
  const addChat = () => {
    if (matchName === '') return;
    db.collection('chats')
      .doc(`${matchName}`)
      .set({
        createdAt: new Date(),
      })
      .then(async () => {
        const chatNames = await fetchChats();
        setMatches(chatNames);
        setMatchName('');
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
      <div>
        {matches.map((chat, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                history.push({
                  pathname: `/chat/${index}`,
                  state: { room: chat },
                });
              }}
            >
              {chat}
            </div>
          );
        })}
      </div>
      {adminUser && (
        <div>
          <input
            value={matchName}
            onChange={(e) => {
              setMatchName(e.target.value);
            }}
          />
          <button
            onClick={() => {
              addChat();
            }}
          >
            追加
          </button>
        </div>
      )}
    </div>
  );
};
export default Home;
