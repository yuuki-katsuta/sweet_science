import { db } from '../base';
import { storage } from '../base';
import { removeEmoji } from '../components/ui/Utils/util';

export const useAddRoom = async (matchSummary, scores, avgScores) => {
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
        await scoreData.doc(`${judge.name}`).set({
          judge: judge.name,
          fighter: judge.fighterScore,
          opponent: judge.opponentScore,
        });
      }
    }
    if (avgScores) {
      const { FighterScore, OpponentScore } = avgScores;
      await docRef.collection('score').doc('AverageScore').set({
        fighter: FighterScore,
        opponent: OpponentScore,
      });
    }
    if (file) {
      const storageRef = storage.ref(`/videos/${room}/${file.name}`);
      await storageRef.put(file);
    }
    alert('試合を追加しました!!');
  } catch (error) {
    alert(error.message);
  }
};
