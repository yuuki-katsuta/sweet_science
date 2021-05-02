import { useEffect, useState, memo, useRef } from 'react';
import { db } from '../../base';
import ScoreTable from './ScoreTable';
import styled from 'styled-components';
import { createData } from './Utils/common-method';

const SContainer = styled.div`
  max-width: 950px;
  margin: 0 auto;
`;
const STotalScore = styled.h4`
  text-align: left;
  margin: 0 0 0 8px;
`;

const AvgScore = memo(({ matchInfo }) => {
  const [update, setUpdata] = useState(false);
  const Scoring = useRef([]);
  const totalScore = useRef({});

  //スコアデータ取得
  const getScore = async () => {
    const scoreData = await db
      .collection('chats')
      .doc(`${matchInfo.title}`)
      .collection('score')
      .doc('AverageScore')
      .get();
    let data = {};
    if (scoreData.exists) {
      data = {
        fighterScore: scoreData.data().fighter,
        opponentScore: scoreData.data().opponent,
      };
    }
    return data;
  };

  useEffect(() => {
    let unmounted = false;
    if (matchInfo) {
      (async () => {
        const avgScore = await getScore();
        //totalを算出
        const fighterTotal = avgScore.fighterScore.reduce((sum, num) => {
          return sum + num;
        });
        const opponentTotal = avgScore.opponentScore.reduce((sum, num) => {
          return sum + num;
        });
        totalScore.current = {
          total: `${fighterTotal}-${opponentTotal}`,
        };
        //スコア算出
        Scoring.current = [
          createData(`${matchInfo.fighter}`, ...avgScore.fighterScore),
          createData(`${matchInfo.opponent}`, ...avgScore.opponentScore),
        ];
        if (!unmounted) {
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
    <SContainer>
      <STotalScore>Average Score {totalScore.current.total}</STotalScore>
      <ScoreTable Scoring={Scoring.current} />
    </SContainer>
  );
});
export default AvgScore;
