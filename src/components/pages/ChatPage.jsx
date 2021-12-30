import { memo } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import MatchInformation from '../ui/ChatPage/MatchInformation';
import MessageItem from '../ui/ChatPage/Message/MessageItem';
import AvgScore from '../ui/ChatPage/Score/AvgScore';
import Score from '../ui/ChatPage/Score/Score.jsx';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import CreateIcon from '@mui/icons-material/Create';

const SContainer = styled(Container)`
  padding: 0 10px;
  margin-top: 24px;
`;

const ChatPage = memo(() => {
  const history = useHistory();
  const location = useLocation();
  const matchInfo = location.state?.matchInformation;

  const FabField = () => {
    return (
      <Fab
        size='small'
        variant='extended'
        onClick={() => {
          history.push({
            pathname: `${location.pathname}/scores`,
            state: { matchInfo },
          });
        }}
      >
        <CreateIcon sx={{ mr: 1 }} />
        ユーザのスコアカードを確認する
      </Fab>
    );
  };

  return location.state ? (
    <div className='container'>
      <Container maxWidth='lg' disableGutters={true}>
        <MatchInformation matchInfo={matchInfo} />
        {matchInfo.scoreData && <Score matchInfo={matchInfo} />}
        {matchInfo.AvgScore && <AvgScore matchInfo={matchInfo} />}
        <FabField />
      </Container>
      <SContainer maxWidth='lg' disableGutters={true}>
        <MessageItem room={matchInfo.room} />
      </SContainer>
    </div>
  ) : (
    <Redirect to={'/'} />
  );
});
export default ChatPage;
