import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import { db } from '../../base';
import MessageAddField from './/MessageAddField';
import MessageList from './MessageList';
import List from '@material-ui/core/List';
import styled from 'styled-components';

const SList = styled(List)`
  &.MessageExists {
    max-height: 56vh;
    overflow: auto;
    gridrow: 1;
    width: 100%;
    max-width: 1100px;
    margin: 24px auto 10px;
    border-top: thin solid #cccccc;
    padding: 0;
  }
`;
const SOwnMessageStyle = styled.div`
  &.own {
    background-color: #eeeeee;
  }
`;

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
      <SList className={messages.length !== 0 && 'MessageExists'}>
        {messages.map((message, index) => {
          return (
            <SOwnMessageStyle
              ref={ref}
              key={index}
              className={message.uid === currentUser.uid ? 'own' : ''}
            >
              <MessageList
                className='messageItem'
                title={matchData.title}
                message={message}
                currentUser={currentUser}
              />
            </SOwnMessageStyle>
          );
        })}
      </SList>
      <MessageAddField
        currentUser={currentUser}
        title={matchData.title}
        refer={ref}
      />
    </>
  );
};
export default MessageItem;
