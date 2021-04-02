import { memo } from 'react';
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

const AddMatchSummary = memo(({ matchSummary, setMatchSummary }) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        id='fighter'
        name='fighter'
        label='fighter'
        color='secondary'
        value={matchSummary.fighter}
        onChange={(e) => {
          setMatchSummary({
            ...matchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <TextField
        id='opponent'
        name='opponent'
        label='opponent'
        color='secondary'
        value={matchSummary.opponent}
        onChange={(e) => {
          setMatchSummary({
            ...matchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <TextField
        id='division'
        name='division'
        label='division'
        color='secondary'
        value={matchSummary.division}
        onChange={(e) => {
          setMatchSummary({
            ...matchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <TextField
        id='date'
        name='date'
        label='date'
        color='secondary'
        value={matchSummary.date}
        onChange={(e) => {
          setMatchSummary({
            ...matchSummary,
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
        value={matchSummary.url}
        onChange={(e) => {
          setMatchSummary({
            ...matchSummary,
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
        value={matchSummary.venue}
        onChange={(e) => {
          setMatchSummary({
            ...matchSummary,
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
        value={matchSummary.overview}
        onChange={(e) => {
          setMatchSummary({
            ...matchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
    </form>
  );
});
export default AddMatchSummary;
