import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../base';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputField from '../InputField/InputField';
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

const AddScore = ({ setIsAddScore, addChat, fighter, opponent }) => {
  const classes = useStyles();

  const [scoreA, setScoreA] = useState({
    judgerName: '',
    fighterScore: '',
    opponentScore: '',
  });
  const [scoreB, setScoreB] = useState({
    judgerName: '',
    fighterScore: '',
    opponentScore: '',
  });
  const [scoreC, setScoreC] = useState({
    judgerName: '',
    fighterScore: '',
    opponentScore: '',
  });

  const addChatWithScore = async () => {
    await addChat();
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

    const scoreData = db
      .collection('chats')
      .doc(`${fighter} vs ${opponent}`)
      .collection('score');

    const { judgeA, judgeB, judgeC } = scores;
    for (const judge of [judgeA, judgeB, judgeC]) {
      scoreData.doc(`${judge.name}`).set({
        judge: judge.name,
        fighter: judge.fighterScore,
        opponent: judge.opponentScore,
      });
    }
    setIsAddScore(false);
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
              addChatWithScore();
            }}
          >
            <AddIcon />
          </Fab>
        </STooltip>
      </SSubmitWrapper>
    </SContainer>
  );
};
export default AddScore;
