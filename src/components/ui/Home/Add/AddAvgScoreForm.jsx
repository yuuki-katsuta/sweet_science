import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const AddAvgScoreForm = ({ addRoom }) => {
  const classes = useStyles();
  const [avgScore, setAvgScore] = useState({
    fighterScore: '',
    opponentScore: '',
  });

  const addChatRoomWithAvgScore = async () => {
    const FighterScore = avgScore.fighterScore.split('/').map(Number);
    const OpponentScore = avgScore.opponentScore.split('/').map(Number);
    const avgScores = { FighterScore, OpponentScore };
    await addRoom(false, avgScores);
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
              addChatRoomWithAvgScore();
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
