import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
    margin: '16px 0 0',
  },
}));

const AddMatchSummary = memo(({ MatchSummary, setMatchSummary }) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        id='fighter'
        name='fighter'
        label='fighter'
        color='secondary'
        value={MatchSummary.fighter}
        onChange={(e) => {
          setMatchSummary({
            ...MatchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <TextField
        id='opponent'
        name='opponent'
        label='opponent'
        color='secondary'
        value={MatchSummary.opponent}
        onChange={(e) => {
          setMatchSummary({
            ...MatchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <TextField
        id='division'
        name='division'
        label='division'
        color='secondary'
        value={MatchSummary.division}
        onChange={(e) => {
          setMatchSummary({
            ...MatchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <TextField
        id='date'
        name='date'
        label='date'
        color='secondary'
        value={MatchSummary.date}
        onChange={(e) => {
          setMatchSummary({
            ...MatchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <TextField
        fullWidth={true}
        id='url'
        name='url'
        label='video url'
        color='secondary'
        value={MatchSummary.url}
        onChange={(e) => {
          setMatchSummary({
            ...MatchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <TextField
        fullWidth={true}
        id='venue'
        name='venue'
        label='venue'
        color='secondary'
        value={MatchSummary.venue}
        onChange={(e) => {
          setMatchSummary({
            ...MatchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <TextField
        fullWidth={true}
        id='standard-multiline-static'
        name='overview'
        label='write overview...'
        multiline
        rows={2}
        value={MatchSummary.overview}
        onChange={(e) => {
          setMatchSummary({
            ...MatchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
    </form>
  );
});
export default AddMatchSummary;
