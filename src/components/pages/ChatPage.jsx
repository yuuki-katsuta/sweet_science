import { Redirect, useHistory } from 'react-router-dom';
import MatchInformation from '../ui/ChatPage/MatchInformation';
import AvgScore from '../ui/ChatPage/Score/AvgScore';
import Score from '../ui/ChatPage/Score/Score.jsx';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import CreateIcon from '@mui/icons-material/Create';
import MessageList from '../ui/ChatPage/Message/MessageList';
import { Suspense } from 'react';

const SContainer = styled(Container)`
  padding: 0 10px;
  margin-top: 24px;
`;

const ChatPage = () => {
  const history = useHistory();
  const matchInfo = history.location.state?.matchInformation;

  const FabField = () => {
    return (
      <Fab
        size='small'
        variant='extended'
        onClick={() => {
          history.push({
            pathname: `${history.location.pathname}/scores`,
            state: { matchInfo },
          });
        }}
      >
        <CreateIcon sx={{ mr: 1 }} />
        ユーザのスコアカードを確認する
      </Fab>
    );
  };

  return history.location.state ? (
    <Suspense
      fallback={
        <h2 style={{ marginTop: '200px', textAlign: 'center' }}>Loading...</h2>
      }
    >
      <div className='container'>
        <Container maxWidth='lg' disableGutters={true}>
          <MatchInformation matchInfo={matchInfo} />
          {matchInfo.scoreData && <Score matchInfo={matchInfo} />}
          {matchInfo.AvgScore && <AvgScore matchInfo={matchInfo} />}
          <FabField />
        </Container>
        <SContainer maxWidth='lg' disableGutters={true}>
          <MessageList room={matchInfo.room} />
        </SContainer>
      </div>
    </Suspense>
  ) : (
    <Redirect to={'/'} />
  );
};
export default ChatPage;
