import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { auth, db } from '../base';

const Home = ({ history }) => {
  const { currentUser, adminUser, setAdminUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [chatName, setChatName] = useState('');

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
    if (chatName === '') return;
    db.collection('chats')
      .doc(`${chatName}`)
      .set({
        createdAt: new Date(),
      })
      .then(async () => {
        const chatNames = await fetchChats();
        setChats(chatNames);
        setChatName('');
      });
  };

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const chatNames = await fetchChats();
      //アンマウントされていなければステートを更新
      if (!unmounted) {
        setChats(chatNames);
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
      <p>{currentUser.displayName}</p>
      <div>
        {chats.map((chat, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                // history.push(`/chat/${index}`);
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
            value={chatName}
            onChange={(e) => {
              setChatName(e.target.value);
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
      <button
        onClick={() => {
          setAdminUser(false);
          auth.signOut();
        }}
      >
        ログアウト
      </button>
    </div>
  );
};
export default Home;
