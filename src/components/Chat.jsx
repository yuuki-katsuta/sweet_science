import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { Redirect } from 'react-router-dom';
import { db } from '../base';
import { makeStyles } from '@material-ui/core/styles';
import Video from './Video';
import MessageAddField from './MessageAddField';
import MessageItem from './MessageItem';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Score from './Score.jsx';

const Chat = ({ history, location }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const ref = useRef();

  //データ取得
  const getMessages = () => {
    if (!location.state) return;
    return db
      .collection('chats')
      .doc(`${location.state.matchData.title}`)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(30)
      .get()
      .then((querySnapshot) => {
        let msg = [];
        querySnapshot.forEach((doc) => {
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
        return msg.reverse();
      });
  };

  //追加
  const messageAdd = () => {
    if (text === '') return;
    db.collection('chats')
      .doc(`${location.state.matchData.title}`)
      .collection('messages')
      .add({
        user: currentUser.displayName,
        message: text,
        uid: currentUser.uid,
        createdAt: new Date(),
        photoURL: currentUser.photoURL,
      })
      .then(async () => {
        const result = await getMessages();
        setMessages(result);
        setText('');
        //自動スクロール
        ref.current.scrollIntoView({ behavior: 'smooth' });
      });
  };

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const messages = await getMessages();
      if (!unmounted) {
        setMessages(messages);
      }
    })();
    return () => {
      unmounted = true;
    };
    //eslint-disable-next-line
  }, []);

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

  return location.state ? (
    <div style={{ margin: '0  0 50px' }}>
      <Container maxWidth='md' disableGutters={true}>
        <Video matchData={location.state.matchData} />
        {location.state.matchData.scoreData && (
          <Score matchData={location.state.matchData} />
        )}
      </Container>
      <Container
        maxWidth='lg'
        disableGutters={true}
        style={{ padding: '0 10px', marginTop: '40px' }}
      >
        <List className={messages.length === 0 ? null : classes.list}>
          {messages.map(({ user, uid, message, photoURL }, index) => {
            return (
              <div
                ref={ref}
                key={index}
                className={uid === currentUser.uid ? classes.ownMessage : null}
              >
                <MessageItem
                  name={user}
                  message={message}
                  uid={uid}
                  photoURL={photoURL}
                  currentUser={currentUser}
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
      </Container>
    </div>
  ) : (
    <Redirect to={'/'} />
  );
};
export default Chat;
