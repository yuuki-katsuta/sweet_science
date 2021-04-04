import { Redirect, useLocation } from 'react-router-dom';
import MatchInformation from './MatchInformation';
import MessageItem from './Message/MessageItem';
import Container from '@material-ui/core/Container';
import Score from './Score/Score.jsx';

const Chat = ({ history }) => {
  const matchData = useLocation().state.matchData;
  return matchData ? (
    <div className='container'>
      <Container maxWidth='md' disableGutters={true}>
        <MatchInformation matchData={matchData} />
        {matchData.scoreData && <Score matchData={matchData} />}
      </Container>
      <Container
        maxWidth='lg'
        disableGutters={true}
        style={{ padding: '0 10px', marginTop: '40px' }}
      >
        <MessageItem history={history} matchData={matchData} />
      </Container>
    </div>
  ) : (
    <Redirect to={'/'} />
  );
};
export default Chat;
