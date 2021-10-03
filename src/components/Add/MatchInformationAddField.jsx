import { useState, memo } from 'react';
import { db } from '../../base';
import { storage } from '../../base';
import { removeEmoji } from '../Utils/util';
import AddScoreForm from './AddScoreForm';
import AddMatchSummary from './AddMatchSummaryForm';
import AddAvgScoreForm from './AddAvgScoreForm';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

const SFormItemWrapper = styled.div`
  position: relative;
`;
const STooltip = styled(Tooltip)`
  position: absolute;
  right: 0;
`;
const SFormControlLabel = styled(FormControlLabel)`
  textalign: center;
  margin-top: 8px;
  padding: 0 16px;
`;

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
    const [isAddScore, setIsAddScore] = useState(false);
    const [isAddAvg, setIsAddAvg] = useState(false);
    const addChat = async () => {
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
        const removeEmojiTitle = removeEmoji(`${fighter} vs ${opponent}`);
        const docRef = db.collection('chats').doc(removeEmojiTitle);
        const lastData = await docRef.get();
        let lastCreatedTime = '';
        if (lastData.exists) {
          lastCreatedTime = lastData.data().createdAt;
        }
        await docRef.set({
          room: removeEmojiTitle,
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
          scoreData: isAddScore,
          AvgScore: isAddAvg,
        });
        if (file) {
          const storageRef = storage.ref(
            `/videos/${fighter} vs ${opponent}/${file.name}`
          );
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
        <SFormItemWrapper>
          <SFormControlLabel
            control={
              <Switch
                disabled={isAddAvg}
                checked={isAddScore}
                onChange={() => {
                  setIsAddScore(!isAddScore);
                }}
                name='isAddScore'
                color='primary'
              />
            }
            label='Add Score'
          />
          <SFormControlLabel
            control={
              <Switch
                disabled={isAddScore}
                checked={isAddAvg}
                onChange={() => {
                  setIsAddAvg(!isAddAvg);
                }}
                name='isAddScore'
                color='primary'
              />
            }
            label='Add AVG'
          />
          {!isAddScore && !isAddAvg && (
            <STooltip title='Add' aria-label='add'>
              <Fab
                color='primary'
                size='small'
                onClick={() => {
                  addChat();
                }}
              >
                <AddIcon />
              </Fab>
            </STooltip>
          )}
        </SFormItemWrapper>
        {isAddScore && (
          <AddScoreForm
            setIsAddScore={setIsAddScore}
            addChat={addChat}
            matchSummary={matchSummary}
          />
        )}
        {isAddAvg && (
          <AddAvgScoreForm
            setIsAddAvg={setIsAddAvg}
            addChat={addChat}
            matchSummary={matchSummary}
          />
        )}
      </>
    );
  }
);
export default MatchInformationAddField;
