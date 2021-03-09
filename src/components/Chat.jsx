import React from 'react';
import { Redirect } from 'react-router-dom';
import Video from '../Video/Video';
import MessageItem from './Message/MessageItem';
import Container from '@material-ui/core/Container';
import Score from './Score/Score.jsx';

const Chat = ({ history, location }) => {
  return location.state ? (
    <div class='container'>
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
        <MessageItem history={history} matchData={location.state.matchData} />
      </Container>
    </div>
  ) : (
    <Redirect to={'/'} />
  );
};
export default Chat;
