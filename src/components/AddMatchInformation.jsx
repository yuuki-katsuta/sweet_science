import React, { useState } from 'react';
import { db } from '../base';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddScore from './AddScore';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const AddMatchInformation = ({ getMatcheInformation, setMatchData }) => {
  const [MatchSummary, setMatchSummary] = useState({
    fighter: '',
    opponent: '',
    division: '',
    date: '',
    url: '',
    venue: '',
    overview: '',
  });
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
  const [checked, setChecked] = useState(false);

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

  //追加
  const addChat = () => {
    const {
      fighter,
      opponent,
      division,
      date,
      venue,
      url,
      overview,
    } = MatchSummary;
    if (fighter && opponent && division && date && venue) {
      //urlから動画のIdを取得
      const videoId = url ? url.split('v=')[1] : null;
      db.collection('chats')
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
        })
        .then(async () => {
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
        });
      //ここに移動？
      if (checked && judgeA.name && judgeB.name && judgeC.name) {
        //A
        const judgeAFighterScore = judgeA.fighterScore.split('/').map(Number);
        const judgeAOpponentScore = judgeA.fighterScore.split('/').map(Number);
        //B
        const judgeBFighterScore = judgeB.fighterScore.split('/').map(Number);
        const judgeBOpponentScore = judgeB.fighterScore.split('/').map(Number);
        //C
        const judgeCFighterScore = judgeC.fighterScore.split('/').map(Number);
        const judgeCOpponentScore = judgeC.fighterScore.split('/').map(Number);

        //dbへ登録
        const scoreData = db
          .collection('chats')
          .doc(`${fighter} vs ${opponent}`)
          .collection('score');

        scoreData.doc(`${judgeA.name}`).set({
          fighter: judgeAFighterScore,
          opponent: judgeAOpponentScore,
        });
        scoreData.doc(`${judgeB.name}`).set({
          fighter: judgeBFighterScore,
          opponent: judgeBOpponentScore,
        });
        scoreData.doc(`${judgeC.name}`).set({
          fighter: judgeCFighterScore,
          opponent: judgeCOpponentScore,
        });
        setChecked(false);
      }
    } else {
      alert('item is not entered');
    }
  };
  return (
    <>
      <h1 className={classes.titleFont}>Add Match</h1>
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
      <FormControlLabel
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
      {checked ? (
        <AddScore
          judgeA={judgeA}
          judgeB={judgeB}
          judgeC={judgeC}
          setJudgeA={setJudgeA}
          setJudgeB={setJudgeB}
          setJudgeC={setJudgeC}
        />
      ) : null}

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
