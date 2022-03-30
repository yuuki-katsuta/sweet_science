import Container from '@material-ui/core/Container';
import AddForm from '../ui/FreeChat/AddFrom';
import MessageList from '../ui/FreeChat/MessageList';
import styled from 'styled-components';
import { useRef } from 'react';

const SDescription = styled.div`
  margin-bottom: 16px;
  color: #666666;
  font-weight: bold;
`;

const FreeChat = () => {
  const ref = useRef();
  return (
    <div className='container'>
      <SDescription>
        <p>
          ここでは自由にボクシングを語り合いましょう!
          <br />
          健全なチャットにご協力をお願いします!
        </p>
      </SDescription>
      <Container maxWidth='lg' disableGutters={true}>
        <MessageList refer={ref} />
        <AddForm refer={ref} />
      </Container>
    </div>
  );
};
export default FreeChat;
