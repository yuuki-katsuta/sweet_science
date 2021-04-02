import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import { db } from '../../base';
import { makeStyles } from '@material-ui/core/styles';
import MessageAddField from './/MessageAddField';
import MessageList from './MessageList';
import List from '@material-ui/core/List';

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

const MessageItem = ({ history, matchData }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const ref = useRef();
  const classes = useStyles();

  //データ取得
  useEffect(() => {
    let isMounted = true;
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
                id: doc.id,
              });
            }
          });
          //配列の要素を反転
          isMounted && setMessages(msg.reverse());
        });
    };
    getMessages();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <List className={messages.length === 0 ? null : classes.list}>
        {messages.map(({ user, uid, message, photoURL, id }, index) => {
          return (
            <div
              ref={ref}
              key={index}
              className={uid === currentUser.uid ? classes.ownMessage : null}
            >
              <MessageList
                className='messageItem'
                name={user ? user : 'ゲストユーザー'}
                message={message}
                uid={uid}
                photoURL={photoURL}
                title={matchData.title}
                id={id}
              />
            </div>
          );
        })}
      </List>

      <MessageAddField
        history={history}
        currentUser={currentUser}
        title={matchData.title}
        refer={ref}
      />
    </>
  );
};
export default MessageItem;
