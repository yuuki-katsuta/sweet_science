import { Redirect, useLocation } from 'react-router-dom';
import MatchInformation from './MatchInformation';
import MessageItem from './Message/MessageItem';
import AvgScore from './Score/AvgScore';
import Score from './Score/Score.jsx';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';

const SContainer = styled(Container)`
  padding: 0 10px;
  margin-top: 40px;
`;

const Chat = () => {
  const location = useLocation();
  const matchData = location.state?.matchData;

  return location.state ? (
    <div className='container'>
      <Container maxWidth='lg' disableGutters={true}>
        <MatchInformation matchData={matchData} />
        {matchData.scoreData && <Score matchData={matchData} />}
        {matchData.AvgScore && <AvgScore matchData={matchData} />}
      </Container>
      <SContainer maxWidth='lg' disableGutters={true}>
        <MessageItem title={matchData.title} />
      </SContainer>
    </div>
  ) : (
    <Redirect to={'/'} />
  );
};
export default Chat;
