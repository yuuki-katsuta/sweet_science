import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import { db } from '../../base';
import MessageAddField from './/MessageAddField';
import MessageList from './MessageList';
import List from '@material-ui/core/List';

const listStyle = {
  maxHeight: '56vh',
  overflow: 'auto',
  gridRow: 1,
  width: '100%',
  maxWidth: '1100px',
  margin: '24px auto 10px',
  borderTop: 'thin solid #CCCCCC',
  padding: 0,
};
const ownMessageStyle = {
  backgroundColor: '#EEEEEE',
};

const MessageItem = ({ matchData }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const ref = useRef();

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
      <List style={messages.length === 0 ? null : listStyle}>
        {messages.map((message, index) => {
          return (
            <div
              ref={ref}
              key={index}
              style={message.uid === currentUser.uid ? ownMessageStyle : null}
            >
              <MessageList
                className='messageItem'
                title={matchData.title}
                message={message}
                currentUser={currentUser}
              />
            </div>
          );
        })}
      </List>
      <MessageAddField
        currentUser={currentUser}
        title={matchData.title}
        refer={ref}
      />
    </>
  );
};
export default MessageItem;
