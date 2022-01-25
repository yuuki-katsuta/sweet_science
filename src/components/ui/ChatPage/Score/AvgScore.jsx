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
const STotalScore = styled.h4`
  text-align: left;
  margin: 0 0 0 8px;
  font-size: 1rem;
`;

const AvgScore = ({ matchInfo }) => {
  const getAvgScoreData = async () => {
    let avgScore = {};
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
    const calculateTotalScore = () => {
      const fighterTotal = avgScore.fighterScore.reduce((sum, num) => {
        return sum + num;
      });
      const opponentTotal = avgScore.opponentScore.reduce((sum, num) => {
        return sum + num;
      });
      return `${fighterTotal}-${opponentTotal}`;
    };

    //スコア算出
    const calculateScore = () => {
      let scoring = [];
      const fighterLength = split(matchInfo.fighter).length;
      const opponentLength = split(matchInfo.opponent).length;
      scoring.push(
        createData(
          `${matchInfo.fighter.slice(0, fighterLength - 1)}`,
          ...avgScore.fighterScore
        ),
        createData(
          `${matchInfo.opponent.slice(0, opponentLength - 1)}`,
          ...avgScore.opponentScore
        )
      );
      return scoring;
    };

    const totalScore = calculateTotalScore();
    const scoring = calculateScore();

    return { scoring, totalScore };
  };

  const useAvgScoreData = () => {
    const { data, error } = useSWR(
      `firestore/${matchInfo.room}/avgScoreData`,
      getAvgScoreData,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        suspense: true,
      }
    );
    return {
      avgScoreData: data,
      isError: error,
    };
  };
  const { avgScoreData, isError } = useAvgScoreData();
  if (isError) return <div>failed to load</div>;
  const { scoring, totalScore } = avgScoreData;

  return (
    <SContainer>
      <STotalScore>Average Score {totalScore.total}</STotalScore>
      <ScoreTable Scoring={scoring} />
    </SContainer>
  );
};
export default AvgScore;
