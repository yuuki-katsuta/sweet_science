import { useEffect, useState, useRef } from 'react';
import { db } from '../../../../base';
import { createData } from '../../Utils/util';
import ScoreTable from './ScoreTable';
import styled from 'styled-components';
import split from 'graphemesplit';

const SContainer = styled.div`
  max-width: 950px;
  margin: 0 auto;
`;
const SJudgeName = styled.h4`
  text-align: left;
  margin: 0 0 0 8px;
`;

const Score = ({ matchInfo }) => {
  const [update, setUpdata] = useState(false);
  const ScoringA = useRef([]);
  const ScoringB = useRef([]);
  const ScoringC = useRef([]);
  const totalScore = useRef({
    judgeA: '',
    judgeB: '',
    judgeC: '',
  });

  useEffect(() => {
    let unmounted = false;
    if (matchInfo) {
      (async () => {
        const querySnapshot = await db
          .collection('chats')
          .doc(matchInfo.room)
          .collection('score')
          .get();
        const scores = [];
        querySnapshot.forEach((doc) => {
          scores.push(doc.data());
        });
        const calculateTotalScore = (scores) => {
          const [judgeA, judgeB, judgeC] = scores;
          //totalを算出
          [judgeA, judgeB, judgeC].forEach((judge, index) => {
            const fighterTotal = judge.fighter.reduce((sum, num) => {
              return sum + num;
            });
            const opponentTotal = judge.opponent.reduce((sum, num) => {
              return sum + num;
            });
            totalScore.current = {
              ...totalScore.current,
              [['judgeA', 'judgeB', 'judgeC'][index]]: {
                name: judge.judge,
                total: `${fighterTotal}-${opponentTotal}`,
              },
            };
          });
        };
        const calculateEachScore = (scores) => {
          const fighterLength = split(matchInfo.fighter).length;
          const opponentLength = split(matchInfo.opponent).length;
          [ScoringA, ScoringB, ScoringC].forEach((Scoring, index) => {
            Scoring.current = [
              createData(
                `${matchInfo.fighter.slice(0, fighterLength - 1)}`,
                ...scores[index].fighter
              ),
              createData(
                `${matchInfo.opponent.slice(0, opponentLength - 1)}`,
                ...scores[index].opponent
              ),
            ];
          });
        };
        calculateTotalScore(scores);
        calculateEachScore(scores);
        if (!unmounted) setUpdata(!update);
      })();
    }
    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line
  }, [matchInfo]);

  return (
    <SContainer>
      <SJudgeName>
        {totalScore.current.judgeA.name} {totalScore.current.judgeA.total}
      </SJudgeName>
      <ScoreTable Scoring={ScoringA.current} />
      <SJudgeName>
        {totalScore.current.judgeB.name} {totalScore.current.judgeB.total}
      </SJudgeName>
      <ScoreTable Scoring={ScoringB.current} />
      <SJudgeName>
        {totalScore.current.judgeC.name} {totalScore.current.judgeC.total}
      </SJudgeName>
      <ScoreTable Scoring={ScoringC.current} />
    </SContainer>
  );
};
export default Score;
