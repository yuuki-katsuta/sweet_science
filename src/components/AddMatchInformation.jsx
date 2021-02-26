import React, { useState } from 'react';
import { db } from '../base';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddScore from './AddScore';
const AddMatchInformation = ({ getMatcheInformation, setMatchData }) => {
  const [MatchSummary, setMatchSummary] = useState({
    fighter1: '',
    fighter2: '',
    division: '',
    date: '',
    url: '',
    venue: '',
    overview: '',
  });
  const [judgeA, setJudgeA] = useState({
    name: '',
    fighterScore: [],
    opponentScore: [],
  });
  const [judgeB, setJudgeB] = useState({
    name: '',
    fighterScore: [],
    opponentScore: [],
  });
  const [judgeC, setJudgeC] = useState({
    name: '',
    fighterScore: [],
    opponentScore: [],
  });

  const useStyles = makeStyles((theme) => ({
    titleFont: {
      fontFamily: 'Arimo',
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '30ch',
      },
      margin: '16px 0 0',
    },
    fab: {
      margin: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  //console.log(judgeA, judgeB, judgeC);

  //追加
  const addChat = () => {
    const {
      fighter1,
      fighter2,
      division,
      date,
      venue,
      url,
      overview,
    } = MatchSummary;
    if (fighter1 && fighter2 && division && date && venue) {
      //urlから動画のIdを取得
      const videoId = url ? url.split('v=')[1] : null;
      db.collection('chats')
        .doc(`${fighter1} vs ${fighter2}`)
        .set({
          title: `${fighter1} vs ${fighter2}`,
          fighter1: fighter1,
          fighter2: fighter2,
          division: division,
          date: date,
          videoId: videoId,
          createdAt: new Date(),
          venue: venue,
          overview: overview,
        })
        .then(async () => {
          const matchInformation = await getMatcheInformation();
          setMatchData(matchInformation);
          setMatchSummary({
            fighter1: '',
            fighter2: '',
            division: '',
            date: '',
            url: '',
            venue: '',
            overview: '',
          });
        });
    } else {
      alert('item is not entered');
    }
  };
  console.log(MatchSummary);
  return (
    <>
      <h1 className={classes.titleFont}>Add Match</h1>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          id='fighter1'
          name='fighter1'
          label='fighter'
          color='secondary'
          value={MatchSummary.fighter1}
          onChange={(e) => {
            setMatchSummary({
              ...MatchSummary,
              [e.target.name]: e.target.value,
            });
          }}
        />
        <TextField
          id='fighter2'
          name='fighter2'
          label='fighter'
          color='secondary'
          value={MatchSummary.fighter2}
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

      <AddScore
        judgeA={judgeA}
        judgeB={judgeB}
        judgeC={judgeC}
        setJudgeA={setJudgeA}
        setJudgeB={setJudgeB}
        setJudgeC={setJudgeC}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-End' }}>
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
      </div>
    </>
  );
};
export default AddMatchInformation;
