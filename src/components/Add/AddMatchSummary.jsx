import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MatchSummaryInputField from '../InputField/MatchSummaryInputField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
    },
    margin: '16px 0 0',
  },
}));

const AddMatchSummary = memo(({ matchSummary, setMatchSummary }) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <MatchSummaryInputField
        id='fighter'
        name='fighter'
        label='fighter'
        value={matchSummary.fighter}
        setState={(e) => {
          setMatchSummary({
            ...matchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <MatchSummaryInputField
        id='opponent'
        name='opponent'
        label='opponent'
        value={matchSummary.opponent}
        setState={(e) => {
          setMatchSummary({
            ...matchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <MatchSummaryInputField
        id='division'
        name='division'
        label='division'
        value={matchSummary.division}
        setState={(e) => {
          setMatchSummary({
            ...matchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <MatchSummaryInputField
        id='date'
        name='date'
        label='date'
        value={matchSummary.date}
        setState={(e) => {
          setMatchSummary({
            ...matchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <MatchSummaryInputField
        id='url'
        name='url'
        label='video url'
        value={matchSummary.url}
        setState={(e) => {
          setMatchSummary({
            ...matchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <MatchSummaryInputField
        id='venue'
        name='venue'
        label='venue'
        value={matchSummary.venue}
        setState={(e) => {
          setMatchSummary({
            ...matchSummary,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <MatchSummaryInputField
        id='standard-multiline-static'
        name='overview'
        label='write overview...'
        multiline
        rows={2}
        value={matchSummary.overview}
        setState={(e) => {
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
