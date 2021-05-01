import { useState, memo } from 'react';
import { db } from '../../base';
import { storage } from '../../base';
import AddScore from './AddScore';
import AddMatchSummary from './AddMatchSummary';
import AddAvgScore from './AddAvgScore';
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

const AddMatchInformation = memo(({ getMatcheInformation, setMatchData }) => {
  const [matchSummary, setMatchSummary] = useState({
    fighter: '',
    opponent: '',
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
      division,
      date,
      venue,
      overview,
      file,
    } = matchSummary;
    try {
      if (!fighter || !opponent || !division || !date || !venue)
        throw new Error('item is not entered');
      await db
        .collection('chats')
        .doc(`${fighter} vs ${opponent}`)
        .set({
          title: `${fighter} vs ${opponent}`,
          fighter: fighter,
          opponent: opponent,
          division: division,
          date: date,
          fileName: file.name,
          createdAt: new Date(),
          venue: venue,
          overview: overview,
          scoreData: isAddScore,
          AvgScore: isAddAvg,
        });
      const storageRef = storage.ref(
        `/videos/${fighter} vs ${opponent}/${file.name}`
      );
      await storageRef.put(file);
      const matchInformation = await getMatcheInformation();
      setMatchData(matchInformation);
      setMatchSummary({
        fighter: '',
        opponent: '',
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
        <AddScore
          setIsAddScore={setIsAddScore}
          addChat={addChat}
          fighter={matchSummary.fighter}
          opponent={matchSummary.opponent}
        />
      )}
      {isAddAvg && (
        <AddAvgScore
          setIsAddAvg={setIsAddAvg}
          addChat={addChat}
          fighter={matchSummary.fighter}
          opponent={matchSummary.opponent}
        />
      )}
    </>
  );
});
export default AddMatchInformation;
