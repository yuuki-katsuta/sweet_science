import { useEffect, useState, memo, useRef } from 'react';
import { db } from '../../base';
import ScoreTable from './ScoreTable';
import styled from 'styled-components';
import { createData } from './Utils/common-method';

const SContainer = styled.div`
  max-width: 1050px;
  margin: 0 auto;
`;
const SJudgeName = styled.h4`
  text-align: left;
  margin: 0 0 0 8px;
`;

const Score = memo(({ matchInfo }) => {
  const [update, setUpdata] = useState(false);
  const ScoringA = useRef([]);
  const ScoringB = useRef([]);
  const ScoringC = useRef([]);
  const totalScore = useRef({
    judgeA: '',
    judgeB: '',
    judgeC: '',
  });

  //スコアデータ取得
  const getScore = async () => {
    const data = await db
      .collection('chats')
      .doc(`${matchInfo.title}`)
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
    if (matchInfo) {
      (async () => {
        const scores = await getScore();
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
        //スコア算出
        [ScoringA, ScoringB, ScoringC].forEach((Scoring, index) => {
          Scoring.current = [
            createData(`${matchInfo.fighter}`, ...scores[index].fighter),
            createData(`${matchInfo.opponent}`, ...scores[index].opponent),
          ];
        });
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
});
export default Score;
