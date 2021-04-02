import { useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../base';
import AddScore from './AddScore';
import AddMatchSummary from './AddMatchSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  titleFont: {
    fontFamily: 'Arimo',
  },
  fab: {
    margin: theme.spacing(2),
  },
}));

const AddMatchInformation = memo(({ getMatcheInformation, setMatchData }) => {
  const [matchSummary, setMatchSummary] = useState({
    fighter: '',
    opponent: '',
    division: '',
    date: '',
    url: '',
    venue: '',
    overview: '',
  });
  const [checked, setChecked] = useState(false);
  const classes = useStyles();

  const addChat = async () => {
    const {
      fighter,
      opponent,
      division,
      date,
      venue,
      url,
      overview,
    } = matchSummary;
    if (fighter && opponent && division && date && venue) {
      //urlから動画のIdを取得
      const videoId = url ? url.split('v=')[1] : null;
      await db
        .collection('chats')
        .doc(`${fighter} vs ${opponent}`)
        .set({
          title: `${fighter} vs ${opponent}`,
          fighter: fighter,
          opponent: opponent,
          division: division,
          date: date,
          videoId: videoId,
          createdAt: new Date(),
          venue: venue,
          overview: overview,
          scoreData: checked,
        });
      const matchInformation = await getMatcheInformation();
      setMatchData(matchInformation);
      setMatchSummary({
        fighter: '',
        opponent: '',
        division: '',
        date: '',
        url: '',
        venue: '',
        overview: '',
      });
    } else {
      alert('item is not entered');
    }
    // eslint-disable-next-line
  };

  return (
    <>
      <h2 className={classes.titleFont}>Add Match</h2>
      <AddMatchSummary
        matchSummary={matchSummary}
        setMatchSummary={setMatchSummary}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-End' }}>
        {!checked && (
          <Tooltip title='Add' aria-label='add'>
            <Fab
              color='primary'
              className={classes.fab}
              size='small'
              onClick={() => {
                addChat();
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        )}
      </div>
      <FormControlLabel
        style={{ marginTop: '8px' }}
        control={
          <Switch
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
            name='checked'
            color='primary'
          />
        }
        label='Add Score'
      />
      {checked && (
        <AddScore
          setChecked={setChecked}
          addChat={addChat}
          fighter={matchSummary.fighter}
          opponent={matchSummary.opponent}
        />
      )}
    </>
  );
});
export default AddMatchInformation;
