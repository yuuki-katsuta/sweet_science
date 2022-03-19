import { db } from '../../../../base';
import MessageAddField from './MessageAddField';
import MessageItem from './MessageItem.jsx';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import useSWR from 'swr';

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
  const fetchMessages = async () => {
    const querySnapshot = await db
      .collection('chats')
      .doc(room)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
    const msg = [];
    querySnapshot.forEach(
      (doc) => doc.exists && msg.push({ id: doc.id, ...doc.data() })
    );
    return msg.reverse();
  };
  const useMessages = (room) => {
    const { data, error } = useSWR(
      `firestore/chat/${room}/message`,
      fetchMessages,
      { suspense: true, revalidateOnFocus: false }
    );
    return {
      messages: data,
      isError: error,
    };
  };
  const { messages, isError } = useMessages(room);

  if (isError) return <div>failed to load</div>;
  return (
    <>
      <SList className={messages.length !== 0 && 'MessageExists'}>
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <MessageItem room={room} message={message} />
            </div>
          );
        })}
      </SList>
      <MessageAddField room={room} />
    </>
  );
};
export default MessageList;
