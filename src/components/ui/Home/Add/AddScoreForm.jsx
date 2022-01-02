import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputField from '../../atoms/InputField/InputField';
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

const basicScoreData = {
  judgerName: '',
  fighterScore: '',
  opponentScore: '',
};

const AddScoreForm = ({ matchSummary, addRoom }) => {
  const classes = useStyles();
  const [scoreA, setScoreA] = useState(basicScoreData);
  const [scoreB, setScoreB] = useState(basicScoreData);
  const [scoreC, setScoreC] = useState(basicScoreData);
  const addChatRoomWithScore = async () => {
    let scores = {};
    [scoreA, scoreB, scoreC].forEach((score, index) => {
      const FighterScore = score.fighterScore.split('/').map(Number);
      const OpponentScore = score.opponentScore.split('/').map(Number);
      scores = {
        ...scores,
        [['judgeA', 'judgeB', 'judgeC'][index]]: {
          name: score.judgerName,
          fighterScore: FighterScore,
          opponentScore: OpponentScore,
        },
      };
    });
    await addRoom(matchSummary, scores, false);
  };

  return (
    <SContainer>
      <SFormWrapper>
        <form className={classes.root} noValidate autoComplete='off'>
          <div>
            <InputField
              placeholder='Judge'
              inputProps={{ 'aria-label': 'description' }}
              value={scoreA.judgerName}
              setState={(e) => {
                setScoreA({ ...scoreA, judgerName: e.target.value });
              }}
            />
            <SInputField
              placeholder='fighter score'
              inputProps={{ 'aria-label': 'description' }}
              value={scoreA.fighterScore}
              setState={(e) => {
                setScoreA({
                  ...scoreA,
                  fighterScore: e.target.value,
                });
              }}
            />
            <SInputField
              placeholder='opponent score'
              inputProps={{ 'aria-label': 'description' }}
              value={scoreA.opponentScore}
              setState={(e) => {
                setScoreA({
                  ...scoreA,
                  opponentScore: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <InputField
              placeholder='Judge'
              inputProps={{ 'aria-label': 'description' }}
              value={scoreB.judgerName}
              setState={(e) => {
                setScoreB({ ...scoreB, judgerName: e.target.value });
              }}
            />
            <SInputField
              placeholder='fighter score'
              inputProps={{ 'aria-label': 'description' }}
              value={scoreB.fighterScore}
              setState={(e) => {
                setScoreB({
                  ...scoreB,
                  fighterScore: e.target.value,
                });
              }}
            />
            <SInputField
              placeholder='opponent score'
              inputProps={{ 'aria-label': 'description' }}
              value={scoreB.opponentScore}
              setState={(e) => {
                setScoreB({
                  ...scoreB,
                  opponentScore: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <InputField
              placeholder='Judge'
              inputProps={{ 'aria-label': 'description' }}
              value={scoreC.judgerName}
              setState={(e) => {
                setScoreC({ ...scoreC, judgerName: e.target.value });
              }}
            />
            <SInputField
              placeholder='fighter score'
              inputProps={{ 'aria-label': 'description' }}
              value={scoreC.fighterScore}
              setState={(e) => {
                setScoreC({
                  ...scoreC,
                  fighterScore: e.target.value,
                });
              }}
            />
            <SInputField
              placeholder='opponent score'
              inputProps={{ 'aria-label': 'description' }}
              value={scoreC.opponentScore}
              setState={(e) => {
                setScoreC({
                  ...scoreC,
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
              addChatRoomWithScore();
            }}
          >
            <AddIcon />
          </Fab>
        </STooltip>
      </SSubmitWrapper>
    </SContainer>
  );
};
export default AddScoreForm;
