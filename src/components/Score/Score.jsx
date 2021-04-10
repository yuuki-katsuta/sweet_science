import { useEffect, useState, memo } from 'react';
import { db } from '../../base';
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
const judgerNameStyle = { textAlign: 'left', margin: '0 0 0 8px' };

const Score = memo(({ matchData }) => {
  const [ScoringA, setScoringA] = useState([]);
  const [ScoringB, setScoringB] = useState([]);
  const [ScoringC, setScoringC] = useState([]);
  const [judgeName, setJudgeName] = useState({
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
      <h4 style={judgerNameStyle}>{judgeName.judgeA}</h4>
      <ScoreTable Scoring={ScoringA} />

      <h4 style={judgerNameStyle}>{judgeName.judgeB}</h4>
      <ScoreTable Scoring={ScoringB} />

      <h4 style={judgerNameStyle}>{judgeName.judgeC}</h4>
      <ScoreTable Scoring={ScoringC} />
    </div>
  );
});
export default Score;
