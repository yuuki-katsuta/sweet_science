import { useState, memo } from 'react';
import { db } from '../../../../base';
import { storage } from '../../../../base';
import { removeEmoji } from '../../Utils/util';
import AddMatchSummary from './AddMatchSummaryForm';
import FormItem from './FormItem';

const MatchInformationAddField = memo(
  ({ getMatcheInformation, setMatchData }) => {
    const [matchSummary, setMatchSummary] = useState({
      fighter: '',
      opponent: '',
      japaneseNotationFighter: '',
      japaneseNotationOpponent: '',
      division: '',
      date: '',
      venue: '',
      overview: '',
      file: '',
    });
    const addRoom = async (scores, avgScores) => {
      const {
        fighter,
        opponent,
        japaneseNotationFighter,
        japaneseNotationOpponent,
        division,
        date,
        venue,
        overview,
        file,
      } = matchSummary;
      try {
        if (
          !fighter ||
          !opponent ||
          !division ||
          !japaneseNotationFighter ||
          !japaneseNotationOpponent ||
          !date ||
          !venue
        )
          throw new Error('item is not entered');
        const room = removeEmoji(`${fighter} vs ${opponent}`);
        const docRef = db.collection('chats').doc(room);
        const lastData = await docRef.get();
        let lastCreatedTime;
        let lastScoreData;
        let lastAvgScore;
        if (lastData.exists) {
          lastCreatedTime = lastData.data().createdAt;
          lastScoreData = lastData.data().scoreData;
          lastAvgScore = lastData.data().AvgScore;
        }
        await docRef.set({
          room: room,
          title: `${fighter} vs ${opponent}`,
          japaneseNotationFighter: japaneseNotationFighter,
          japaneseNotationOpponent: japaneseNotationOpponent,
          fighter: fighter,
          opponent: opponent,
          division: division,
          date: date,
          omittedDate: date.slice(5),
          fileName: file.name || null,
          createdAt: lastCreatedTime || new Date(),
          venue: venue,
          overview: overview,
          scoreData: lastScoreData || scores ? true : false,
          AvgScore: lastAvgScore || avgScores ? true : false,
        });
        if (scores) {
          const { judgeA, judgeB, judgeC } = scores;
          const scoreData = docRef.collection('score');
          for (const judge of [judgeA, judgeB, judgeC]) {
            scoreData.doc(`${judge.name}`).set({
              judge: judge.name,
              fighter: judge.fighterScore,
              opponent: judge.opponentScore,
            });
          }
        }
        if (avgScores) {
          const { FighterScore, OpponentScore } = avgScores;
          docRef.collection('score').doc('AverageScore').set({
            fighter: FighterScore,
            opponent: OpponentScore,
          });
        }
        if (file) {
          const storageRef = storage.ref(`/videos/${room}/${file.name}`);
          await storageRef.put(file);
        }
        const matchInformation = await getMatcheInformation();
        setMatchData(matchInformation);
        setMatchSummary({
          fighter: '',
          opponent: '',
          japaneseNotationFighter: '',
          japaneseNotationOpponent: '',
          division: '',
          date: '',
          file: '',
          venue: '',
          overview: '',
        });
      } catch (error) {
        alert(error.message);
      }
    };

    return (
      <>
        <h2 className='section-title'>Add Match</h2>
        <AddMatchSummary
          matchSummary={matchSummary}
          setMatchSummary={setMatchSummary}
        />
        <FormItem addRoom={addRoom} />
      </>
    );
  }
);
export default MatchInformationAddField;
