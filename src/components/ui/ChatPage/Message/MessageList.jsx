import { useEffect, useState, useRef } from 'react';
import { db } from '../../../../base';
import MessageAddField from './MessageAddField';
import MessageItem from './MessageItem.jsx';
import List from '@material-ui/core/List';
import styled from 'styled-components';

const SList = styled(List)`
  &.MessageExists {
    max-height: 56vh;
    overflow: auto;
    gridrow: 1;
    width: 100%;
    max-width: 1150px;
    margin: 24px auto 10px;
    border-top: thin solid #cccccc;
    padding: 0;
  }
`;

const MessageList = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const ref = useRef();

  //データ取得
  useEffect(() => {
    let isMounted = true;
    db.collection('chats')
      .doc(room)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .limit(50)
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
              liked: doc.data().liked,
            });
          }
        });
        //配列の要素を反転
        isMounted && setMessages(msg);
      });
    return () => {
      isMounted = false;
    };
  }, [room]);

  return (
    <>
      <SList className={messages.length !== 0 && 'MessageExists'}>
        {messages.map((message, index) => {
          return (
            <div ref={ref} key={index}>
              <MessageItem room={room} message={message} />
            </div>
          );
        })}
      </SList>
      <MessageAddField room={room} refer={ref} />
    </>
  );
};
export default MessageList;
