import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { Redirect } from 'react-router-dom';
import { db } from '../base';
import { makeStyles } from '@material-ui/core/styles';
import Video from './Video';
import MessageAddField from './MessageAddField';
import MessageItem from './MessageItem';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';

const Chat = ({ history, location }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  //データ取得
  const getMessages = () => {
    if (!location.state) return;
    return db
      .collection('chats')
      .doc(`${location.state.matchData.title}`)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        let msg = [];
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            msg.push({
              message: doc.data().message,
              user: doc.data().user,
              uid: doc.data().uid,
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
      })
      .then(async () => {
        const result = await getMessages();
        setMessages(result);
        setText('');
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
      overflow: 'auto',
      gridRow: 1,
      width: '100%',
      maxWidth: '1100px',
      margin: '24px auto 10px',
      borderTop: 'medium solid #CCCCCC',
      padding: 0,
    },
    ownMessage: {
      backgroundColor: 'white',
    },
  });
  const classes = useStyles();

  return location.state ? (
    <div style={{ margin: '0  0 50px' }}>
      <Video matchData={location.state.matchData} />
      <Container
        maxWidth='lg'
        disableGutters={true}
        style={{ padding: '0 10px' }}
      >
        {messages && (
          <List className={classes.list}>
            {messages.map(({ user, uid, message }, index) => {
              return (
                <div
                  key={index}
                  className={
                    uid === currentUser.uid ? classes.ownMessage : null
                  }
                >
                  <MessageItem name={user} message={message} />
                </div>
              );
            })}
          </List>
        )}

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
