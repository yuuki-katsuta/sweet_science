import { useEffect, useState, memo, useRef } from 'react';
import { db } from '../../base';
import ScoreTable from './ScoreTable';
import styled from 'styled-components';
import { createData } from './Utils/common-method';
import split from 'graphemesplit';

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

  useEffect(() => {
    let unmounted = false;
    if (matchInfo) {
      let avgScore = {};
      (async () => {
        const scoreData = await db
          .collection('chats')
          .doc(matchInfo.room)
          .collection('score')
          .doc('AverageScore')
          .get();
        if (scoreData.exists) {
          avgScore = {
            fighterScore: scoreData.data().fighter,
            opponentScore: scoreData.data().opponent,
          };
        }
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
        const fighterLength = split(matchInfo.fighter).length;
        const opponentLength = split(matchInfo.opponent).length;
        Scoring.current = [
          createData(
            `${matchInfo.fighter.slice(0, fighterLength - 1)}`,
            ...avgScore.fighterScore
          ),
          createData(
            `${matchInfo.opponent.slice(0, opponentLength - 1)}`,
            ...avgScore.opponentScore
          ),
        ];
        if (!unmounted) {
          setUpdata(!update);
        }
      })();
      return () => {
        unmounted = true;
      };
    }
    // eslint-disable-next-line
  }, [matchInfo]);

  return (
    <SContainer>
      <STotalScore>Average Score {totalScore.current.total}</STotalScore>
      <ScoreTable Scoring={Scoring.current} />
    </SContainer>
  );
});
export default AvgScore;
