import { Redirect, useLocation } from 'react-router-dom';
import MatchInformation from './MatchInformation';
import MessageItem from './Message/MessageItem';
import AvgScore from './Score/AvgScore';
import Score from './Score/Score.jsx';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';

const SContainer = styled(Container)`
  padding: 0 10px;
  margin-top: 24px;
`;

const ChatPage = () => {
  const location = useLocation();
  const matchInfo = location.state?.matchInformation;

  return location.state ? (
    <div className='container'>
      <Container maxWidth='lg' disableGutters={true}>
        <MatchInformation matchInfo={matchInfo} />
        {matchInfo.scoreData && <Score matchInfo={matchInfo} />}
        {matchInfo.AvgScore && <AvgScore matchInfo={matchInfo} />}
      </Container>
      <SContainer maxWidth='lg' disableGutters={true}>
        <MessageItem title={matchInfo.title} />
      </SContainer>
    </div>
  ) : (
    <Redirect to={'/'} />
  );
};
export default ChatPage;
