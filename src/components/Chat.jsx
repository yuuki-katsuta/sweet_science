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
  return location.state ? (
    <div className='container'>
      <Container maxWidth='lg' disableGutters={true}>
        <MatchInformation matchData={location.state.matchData} />
        {location.state.matchData.scoreData && (
          <Score matchData={location.state.matchData} />
        )}
        {location.state.matchData.AvgScore && (
          <AvgScore matchData={location.state.matchData} />
        )}
      </Container>
      <SContainer maxWidth='lg' disableGutters={true}>
        <MessageItem matchData={location.state.matchData} />
      </SContainer>
    </div>
  ) : (
    <Redirect to={'/'} />
  );
};
export default Chat;
