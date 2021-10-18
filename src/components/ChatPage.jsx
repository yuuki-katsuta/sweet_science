import { memo } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import MatchInformation from './MatchInformation';
import MessageItem from './Message/MessageItem';
import AvgScore from './Score/AvgScore';
import Score from './Score/Score.jsx';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import CreateIcon from '@mui/icons-material/Create';

const SContainer = styled(Container)`
  padding: 0 10px;
  margin-top: 24px;
`;
const SFabWrapper = styled.div`
  text-align: center;
`;

const ChatPage = memo(() => {
  const history = useHistory();
  const location = useLocation();
  const matchInfo = location.state?.matchInformation;

  return location.state ? (
    <div className='container'>
      <Container maxWidth='lg' disableGutters={true}>
        <MatchInformation matchInfo={matchInfo} />
        {matchInfo.scoreData && <Score matchInfo={matchInfo} />}
        {matchInfo.AvgScore && <AvgScore matchInfo={matchInfo} />}
        <SFabWrapper>
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
        </SFabWrapper>
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
