import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { auth, db } from '../base';

const Home = ({ history }) => {
  const [chats, setChats] = useState([]);
  //const Chats = db.collection('Chats');

  //取得
  const fetchChats = () => {
    db.collection('chats')
      .get()
      .then((querySnapshot) => {
        // if (doc.data()) {
        //   console.log(doc.data());
        // }
        const newChats = [];
        querySnapshot.forEach((doc) => {
          newChats.push(doc.id);
        });
        setChats(newChats);
      });
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <p>home</p>
      <p>{currentUser.displayName}</p>
      <p>{currentUser.uid}</p>

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

      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        ログアウト
      </button>
    </div>
  );
};
export default Home;
