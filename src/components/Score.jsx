import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { db } from '../base';
import ScoreTable from './ScoreTable';

function createData(
  name,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve
) {
  return {
    name,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
  };
}

const Score = ({ matchData }) => {
  const [ScoringA, setScoringA] = useState([]);
  const [ScoringB, setScoringB] = useState([]);
  const [ScoringC, setScoringC] = useState([]);
  const [judgeName, setJudgeName] = useState({
    judgeA: '',
    judgeB: '',
    judgeC: '',
  });

  const useStyles = makeStyles({
    judger: {
      textAlign: 'left',
      margin: '0 0 5px 8px',
    },
  });
  const classes = useStyles();

  //スコアデータ取得
  const getScore = () => {
    return db
      .collection('chats')
      .doc(`${matchData.title}`)
      .collection('score')
      .get()
      .then((data) => {
        const ScoreData = [];
        data.forEach((doc) => {
          ScoreData.push(doc.data());
        });
        return ScoreData;
      });
  };

  useEffect(() => {
    let unmounted = false;
    if (matchData) {
      (async () => {
        const scores = await getScore();
        const [judgeA, judgeB, judgeC] = scores;
        if (!unmounted) {
          setScoringA([
            createData(`${matchData.fighter}`, ...judgeA.fighter),
            createData(`${matchData.opponent}`, ...judgeA.opponent),
          ]);
          setScoringB([
            createData(`${matchData.fighter}`, ...judgeB.fighter),
            createData(`${matchData.opponent}`, ...judgeB.opponent),
          ]);
          setScoringC([
            createData(`${matchData.fighter}`, ...judgeC.fighter),
            createData(`${matchData.opponent}`, ...judgeC.opponent),
          ]);
          setJudgeName({
            judgeA: judgeA.judge,
            judgeB: judgeB.judge,
            judgeC: judgeC.judge,
          });
        }
      })();
      return () => {
        unmounted = true;
      };
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h4 className={classes.judger}>{judgeName.judgeA}</h4>
      <ScoreTable Scoring={ScoringA} />

      <h4 className={classes.judger}>{judgeName.judgeB}</h4>
      <ScoreTable Scoring={ScoringB} />

      <h4 className={classes.judger}>{judgeName.judgeC}</h4>
      <ScoreTable Scoring={ScoringC} />
    </div>
  );
};
export default Score;
