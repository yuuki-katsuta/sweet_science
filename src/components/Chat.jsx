import { Redirect } from 'react-router-dom';
import MatchInformation from './MatchInformation';
import MessageItem from './Message/MessageItem';
import Container from '@material-ui/core/Container';
import Score from './Score/Score.jsx';

const Chat = ({ history, location }) => {
  return location.state ? (
    <div className='container'>
      <Container maxWidth='md' disableGutters={true}>
        <MatchInformation matchData={location.state.matchData} />
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
