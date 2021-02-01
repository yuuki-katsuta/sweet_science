import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { Redirect } from 'react-router-dom';
import { db } from '../base';
import ReactPlayer from 'react-player/youtube';

const Chat = ({ history, location }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  //データ取得
  const fetchMessages = () => {
    if (!location.state) return;
    return db
      .collection('chats')
      .doc(`${location.state.match}`)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        let msg = [];
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            msg.push({
              message: doc.data().message,
            });
          }
        });
        return msg.reverse();
      });
  };

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const messages = await fetchMessages();
      if (!unmounted) {
        setMessages(messages);
      }
    })();
    return () => {
      unmounted = true;
    };
    //eslint-disable-next-line
  }, []);

  //追加
  const messageAdd = () => {
    if (text === '') return;
    db.collection('chats')
      .doc(`${location.state.match}`)
      .collection('messages')
      .add({
        user: currentUser.displayName,
        message: text,
        createdAt: new Date(),
      })
      .then(async () => {
        const result = await fetchMessages();
        setMessages(result);
        setText('');
      });
  };

  return location.state ? (
    <div style={{ margin: '0  0 100px' }}>
      <h1>{location.state.match}</h1>
      <ReactPlayer
        url={location.state.url}
        controls={true}
        width='90%'
        height='450px'
        style={{ margin: '0 auto' }}
      />

      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          messageAdd();
        }}
      >
        送信
      </button>

      {messages.map((data, index) => {
        return <div key={index}>{data.message}</div>;
      })}
      <button
        onClick={() => {
          history.push('/');
        }}
      >
        戻る
      </button>
    </div>
  ) : (
    <Redirect to={'/'} />
  );
};
export default Chat;
