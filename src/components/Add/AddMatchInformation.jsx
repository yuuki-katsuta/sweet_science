import React, { useState } from 'react';
import { db } from '../../base';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddScore from './AddScore';
import AddMatchSummary from './AddMatchSummary';
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
          scoreData: checked,
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
      if (checked && judgeA.name && judgeB.name && judgeC.name) {
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
      }
    } else {
      alert('item is not entered');
    }
  };
  return (
    <>
      <h2 className={classes.titleFont}>Add Match</h2>
      <AddMatchSummary
        MatchSummary={MatchSummary}
        setMatchSummary={setMatchSummary}
      />
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
