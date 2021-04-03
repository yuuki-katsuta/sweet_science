import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../base';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const AddScore = memo(({ setChecked, addChat, fighter, opponent }) => {
  const classes = useStyles();

  const [judgeA, setJudgeA] = useState({
    name: '',
    fighterScore: '',
    opponentScore: '',
  });
  const [judgeB, setJudgeB] = useState({
    name: '',
    fighterScore: '',
    opponentScore: '',
  });
  const [judgeC, setJudgeC] = useState({
    name: '',
    fighterScore: '',
    opponentScore: '',
  });

  const addChatWithScore = async () => {
    await addChat();
    //A
    const judgeAFighterScore = judgeA.fighterScore.split('/').map(Number);
    const judgeAOpponentScore = judgeA.opponentScore.split('/').map(Number);
    //B
    const judgeBFighterScore = judgeB.fighterScore.split('/').map(Number);
    const judgeBOpponentScore = judgeB.opponentScore.split('/').map(Number);
    //C
    const judgeCFighterScore = judgeC.fighterScore.split('/').map(Number);
    const judgeCOpponentScore = judgeC.opponentScore.split('/').map(Number);

    const scoreData = db
      .collection('chats')
      .doc(`${fighter} vs ${opponent}`)
      .collection('score');

    scoreData.doc(`${judgeA.name}`).set({
      judge: judgeA.name,
      fighter: judgeAFighterScore,
      opponent: judgeAOpponentScore,
    });
    scoreData.doc(`${judgeB.name}`).set({
      judge: judgeB.name,
      fighter: judgeBFighterScore,
      opponent: judgeBOpponentScore,
    });
    scoreData.doc(`${judgeC.name}`).set({
      judge: judgeC.name,
      fighter: judgeCFighterScore,
      opponent: judgeCOpponentScore,
    });
    setChecked(false);
  };

  return (
    <div style={{ marginBottom: '80px' }}>
      <div style={{ maxWidth: '730px', margin: '16px auto 0' }}>
        <form className={classes.root} noValidate autoComplete='off'>
          <Input
            placeholder='Judge'
            inputProps={{ 'aria-label': 'description' }}
            value={judgeA.name}
            onChange={(e) => {
              setJudgeA({ ...judgeA, name: e.target.value });
            }}
          />
          <Input
            placeholder='fighter score'
            inputProps={{ 'aria-label': 'description' }}
            value={judgeA.fighterScore}
            onChange={(e) => {
              setJudgeA({
                ...judgeA,
                fighterScore: e.target.value,
              });
            }}
          />
          <Input
            placeholder='opponent score'
            inputProps={{ 'aria-label': 'description' }}
            value={judgeA.opponentScore}
            onChange={(e) => {
              setJudgeA({
                ...judgeA,
                opponentScore: e.target.value,
              });
            }}
          />
          <Input
            placeholder='Judge'
            inputProps={{ 'aria-label': 'description' }}
            value={judgeB.name}
            onChange={(e) => {
              setJudgeB({ ...judgeB, name: e.target.value });
            }}
          />
          <Input
            placeholder='fighter score'
            inputProps={{ 'aria-label': 'description' }}
            value={judgeB.fighterScore}
            onChange={(e) => {
              setJudgeB({
                ...judgeB,
                fighterScore: e.target.value,
              });
            }}
          />
          <Input
            placeholder='opponent score'
            inputProps={{ 'aria-label': 'description' }}
            value={judgeB.opponentScore}
            onChange={(e) => {
              setJudgeB({
                ...judgeB,
                opponentScore: e.target.value,
              });
            }}
          />
          <Input
            placeholder='Judge'
            inputProps={{ 'aria-label': 'description' }}
            value={judgeC.name}
            onChange={(e) => {
              setJudgeC({ ...judgeC, name: e.target.value });
            }}
          />
          <Input
            placeholder='fighter score'
            inputProps={{ 'aria-label': 'description' }}
            value={judgeC.fighterScore}
            onChange={(e) => {
              setJudgeC({
                ...judgeC,
                fighterScore: e.target.value,
              });
            }}
          />
          <Input
            placeholder='opponent score'
            inputProps={{ 'aria-label': 'description' }}
            value={judgeC.opponentScore}
            onChange={(e) => {
              setJudgeC({
                ...judgeC,
                opponentScore: e.target.value,
              });
            }}
          />
        </form>
      </div>

      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', right: 10 }}>
          <Tooltip title='Add' aria-label='add'>
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
          </Tooltip>
        </span>
      </div>
    </div>
  );
});
export default AddScore;
