import { db } from '../../../base';
import MessageItem from './MessageItem';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';

const SList = styled(List)`
  &.MessageExists {
    height: 55vh;
    max-height: 55vh;
    overflow: auto;
    gridrow: 1;
    width: 100%;
    max-width: 1150px;
    margin: 24px auto 10px;
    border-top: thin solid #cccccc;
    padding: 0;
  }
  &.noMessage {
    height: 56vh;
  }
`;

const MessageList = ({ refer }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = db
      .collection('free-chat')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot((Snapshot) => {
        let msg = [];
        Snapshot.forEach(
          (doc) => doc.exists && msg.push({ id: doc.id, ...doc.data() })
        );
        //配列の要素を反転
        isMounted && setMessages(msg.reverse());
      });
    return () => {
      unsubscribe();
      isMounted = false;
    };
  }, []);

  return (
    <SList className={messages.length !== 0 ? 'MessageExists' : 'noMessage'}>
      {messages.map((message, index) => {
        return (
          <div key={index} ref={refer}>
            <MessageItem message={message} />
          </div>
        );
      })}
    </SList>
  );
};
export default MessageList;
