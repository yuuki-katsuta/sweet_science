import { db } from '../../../../base';
import { createData } from '../../Utils/util';
import ScoreTable from './ScoreTable';
import styled from 'styled-components';
import split from 'graphemesplit';
import useSWR from 'swr';

const SContainer = styled.div`
  max-width: 950px;
  margin: 0 auto;
`;
const SJudgeName = styled.h4`
  text-align: left;
  margin: 0 0 0 8px;
`;

const Score = ({ matchInfo }) => {
  const calculateTotalScore = (scores) => {
    let totalScore = {};
    const [judgeA, judgeB, judgeC] = scores;
    //totalを算出
    [judgeA, judgeB, judgeC].forEach((judge, index) => {
      const fighterTotal = judge.fighter.reduce((sum, num) => sum + num);
      const opponentTotal = judge.opponent.reduce((sum, num) => sum + num);
      totalScore = {
        ...totalScore,
        [['judgeA', 'judgeB', 'judgeC'][index]]: {
          name: judge.judge,
          total: `${fighterTotal}-${opponentTotal}`,
        },
      };
    });
    return totalScore;
  };

  const calculateEachScore = (scores) => {
    let scoringA = [];
    let scoringB = [];
    let scoringC = [];
    const fighterLength = split(matchInfo.fighter).length;
    const opponentLength = split(matchInfo.opponent).length;
    [scoringA, scoringB, scoringC].forEach((scoring, index) => {
      scoring.push(
        createData(
          `${matchInfo.fighter.slice(0, fighterLength - 1)}`,
          ...scores[index].fighter
        ),
        createData(
          `${matchInfo.opponent.slice(0, opponentLength - 1)}`,
          ...scores[index].opponent
        )
      );
    });
    return { scoringA, scoringB, scoringC };
  };

  const getScoreData = async () => {
    const querySnapshot = await db
      .collection('chats')
      .doc(matchInfo.room)
      .collection('score')
      .get();
    const scores = [];
    querySnapshot.forEach((doc) => {
      scores.push(doc.data());
    });
    const totalScore = calculateTotalScore(scores);
    const { scoringA, scoringB, scoringC } = calculateEachScore(scores);
    return { totalScore, scoringA, scoringB, scoringC };
  };

  const useScoreData = () => {
    const { data, error } = useSWR(
      `firestore/${matchInfo.room}/scoreData`,
      getScoreData,
      {
        //SWR がマウントされ、古いデータがある場合に SWR を再検証する必要があるかどうかを制御
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        suspense: true,
      }
    );
    return {
      scoreData: data,
      isError: error,
    };
  };
  const { scoreData, isError } = useScoreData();
  if (isError) return <div>failed to load</div>;
  const { totalScore, scoringA, scoringB, scoringC } = scoreData;
  return (
    <SContainer>
      <SJudgeName>
        {totalScore.judgeA.name} {totalScore.judgeA.total}
      </SJudgeName>
      <ScoreTable Scoring={scoringA} />
      <SJudgeName>
        {totalScore.judgeB.name} {totalScore.judgeB.total}
      </SJudgeName>
      <ScoreTable Scoring={scoringB} />
      <SJudgeName>
        {totalScore.judgeC.name} {totalScore.judgeC.total}
      </SJudgeName>
      <ScoreTable Scoring={scoringC} />
    </SContainer>
  );
};
export default Score;
