import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextInputField from '../InputField/TextInputField';

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
  const handleVideoFile = (e) => {
    const videoFile = e.target.files[0];
    if (videoFile) {
      setMatchSummary({
        ...matchSummary,
        file: videoFile,
      });
    }
  };
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextInputField
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
      <TextInputField
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
      <TextInputField
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
      <TextInputField
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
      <TextInputField
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
      <TextInputField
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
      <div>
        <input onChange={handleVideoFile} type='file' />
      </div>
    </form>
  );
});
export default AddMatchSummary;
