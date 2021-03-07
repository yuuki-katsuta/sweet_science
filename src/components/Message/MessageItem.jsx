import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import { db } from '../../base';
import { makeStyles } from '@material-ui/core/styles';
import MessageAddField from './/MessageAddField';
import MessageList from './MessageList';
import List from '@material-ui/core/List';

const MessageItem = ({ history, matchData }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const ref = useRef();

  const useStyles = makeStyles({
    list: {
      maxHeight: '56vh',
      overflow: 'auto',
      gridRow: 1,
      width: '100%',
      maxWidth: '1100px',
      margin: '24px auto 10px',
      borderTop: 'thin solid #CCCCCC',
      padding: 0,
    },
    ownMessage: {
      backgroundColor: '#EEEEEE',
    },
  });
  const classes = useStyles();

  useEffect(() => {
    getMessages();
    //eslint-disable-next-line
  }, []);

  //データ取得
  const getMessages = () => {
    if (!matchData) return;
    db.collection('chats')
      .doc(`${matchData.title}`)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(35)
      .onSnapshot((Snapshot) => {
        let msg = [];
        Snapshot.forEach((doc) => {
          if (doc.data()) {
            msg.push({
              message: doc.data().message,
              user: doc.data().user,
              uid: doc.data().uid,
              photoURL: doc.data().photoURL,
            });
          }
        });
        //配列の要素を反転
        setMessages(msg.reverse());
      });
  };

  //追加
  const messageAdd = () => {
    if (text === '') return;
    db.collection('chats')
      .doc(`${matchData.title}`)
      .collection('messages')
      .add({
        user: currentUser.displayName,
        message: text,
        uid: currentUser.uid,
        createdAt: new Date(),
        photoURL: currentUser.photoURL,
      })
      .then(async () => {
        await getMessages();
        setText('');
        //自動スクロール
        ref.current.scrollIntoView({ behavior: 'smooth' });
      });
  };
  return (
    <>
      <List className={messages.length === 0 ? null : classes.list}>
        {messages.map(({ user, uid, message, photoURL }, index) => {
          return (
            <div
              ref={ref}
              key={index}
              className={uid === currentUser.uid ? classes.ownMessage : null}
            >
              <MessageList
                name={user}
                message={message}
                uid={uid}
                photoURL={photoURL}
                currentUser={currentUser}
                className='messageItem'
              />
            </div>
          );
        })}
      </List>

      <MessageAddField
        history={history}
        messageAdd={messageAdd}
        text={text}
        setText={setText}
      />
    </>
  );
};
export default MessageItem;
