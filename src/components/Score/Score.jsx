import { useEffect, useState, memo, useRef } from 'react';
import { db } from '../../base';
import ScoreTable from './ScoreTable';

const createData = (
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
) => {
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
};
const judgerNameStyle = { textAlign: 'left', margin: '0 0 0 8px' };

const Score = memo(({ matchData }) => {
  const [update, setUpdata] = useState(false);
  const ScoringA = useRef([]);
  const ScoringB = useRef([]);
  const ScoringC = useRef([]);
  const judgeName = useRef({
    judgeA: '',
    judgeB: '',
    judgeC: '',
  });

  //スコアデータ取得
  const getScore = async () => {
    const data = await db
      .collection('chats')
      .doc(`${matchData.title}`)
      .collection('score')
      .get();
    const ScoreData = [];
    data.forEach((doc) => {
      ScoreData.push(doc.data());
    });
    return ScoreData;
  };

  useEffect(() => {
    let unmounted = false;
    if (matchData) {
      (async () => {
        const scores = await getScore();
        const [judgeA, judgeB, judgeC] = scores;
        if (!unmounted) {
          ScoringA.current = [
            createData(`${matchData.fighter}`, ...judgeA.fighter),
            createData(`${matchData.opponent}`, ...judgeA.opponent),
          ];
          ScoringB.current = [
            createData(`${matchData.fighter}`, ...judgeB.fighter),
            createData(`${matchData.opponent}`, ...judgeB.opponent),
          ];
          ScoringC.current = [
            createData(`${matchData.fighter}`, ...judgeC.fighter),
            createData(`${matchData.opponent}`, ...judgeC.opponent),
          ];
          judgeName.current = {
            judgeA: judgeA.judge,
            judgeB: judgeB.judge,
            judgeC: judgeC.judge,
          };
          setUpdata(!update);
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
      <h4 style={judgerNameStyle}>{judgeName.current.judgeA}</h4>
      <ScoreTable Scoring={ScoringA.current} />

      <h4 style={judgerNameStyle}>{judgeName.current.judgeB}</h4>
      <ScoreTable Scoring={ScoringB.current} />

      <h4 style={judgerNameStyle}>{judgeName.current.judgeC}</h4>
      <ScoreTable Scoring={ScoringC.current} />
    </div>
  );
});
export default Score;
