import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../base';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
  SContainer,
  SFormWrapper,
  SSubmitWrapper,
  STooltip,
  SInputField,
} from './BaseStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const AddAvgScoreForm = ({ addChat, fighter, opponent, setIsAddAvg }) => {
  const classes = useStyles();
  const [avgScore, setAvgScore] = useState({
    fighterScore: '',
    opponentScore: '',
  });

  const addChatWithAvgScore = async () => {
    await addChat();
    const FighterScore = avgScore.fighterScore.split('/').map(Number);
    const OpponentScore = avgScore.opponentScore.split('/').map(Number);
    const scoreData = db
      .collection('chats')
      .doc(`${fighter} vs ${opponent}`)
      .collection('score');
    scoreData.doc('AverageScore').set({
      fighter: FighterScore,
      opponent: OpponentScore,
    });
    setIsAddAvg(false);
  };

  return (
    <SContainer>
      <SFormWrapper>
        <form className={classes.root} noValidate autoComplete='off'>
          <div>
            <SInputField
              placeholder='fighter score'
              inputProps={{ 'aria-label': 'description' }}
              value={avgScore.fighterScore}
              setState={(e) => {
                setAvgScore({
                  ...avgScore,
                  fighterScore: e.target.value,
                });
              }}
            />
            <SInputField
              placeholder='opponent score'
              inputProps={{ 'aria-label': 'description' }}
              value={avgScore.opponentScore}
              setState={(e) => {
                setAvgScore({
                  ...avgScore,
                  opponentScore: e.target.value,
                });
              }}
            />
          </div>
        </form>
      </SFormWrapper>
      <SSubmitWrapper>
        <STooltip title='Add' aria-label='add'>
          <Fab
            color='primary'
            className={classes.fab}
            size='small'
            onClick={() => {
              addChatWithAvgScore();
            }}
          >
            <AddIcon />
          </Fab>
        </STooltip>
      </SSubmitWrapper>
    </SContainer>
  );
};
export default AddAvgScoreForm;
