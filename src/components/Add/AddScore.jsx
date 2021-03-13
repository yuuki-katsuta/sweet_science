import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const AddScore = ({
  judgeA,
  judgeB,
  judgeC,
  setJudgeA,
  setJudgeB,
  setJudgeC,
}) => {
  const classes = useStyles();

  return (
    <div>
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
    </div>
  );
};
export default AddScore;
