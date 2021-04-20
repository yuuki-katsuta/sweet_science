import { useState, memo } from 'react';
import { db } from '../../base';
import AddScore from './AddScore';
import AddMatchSummary from './AddMatchSummary';
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
`;

const AddMatchInformation = memo(({ getMatcheInformation, setMatchData }) => {
  const [matchSummary, setMatchSummary] = useState({
    fighter: '',
    opponent: '',
    division: '',
    date: '',
    url: '',
    venue: '',
    overview: '',
  });
  const [checked, setChecked] = useState(false);

  const addChat = async () => {
    const {
      fighter,
      opponent,
      division,
      date,
      venue,
      url,
      overview,
    } = matchSummary;
    if (fighter && opponent && division && date && venue) {
      //urlから動画のIdを取得
      const videoId = url ? url.split('v=')[1] : null;
      await db
        .collection('chats')
        .doc(`${fighter} vs ${opponent}`)
        .set({
          title: `${fighter} vs ${opponent}`,
          fighter: fighter,
          opponent: opponent,
          division: division,
          date: date,
          videoId: videoId,
          createdAt: new Date(),
          venue: venue,
          overview: overview,
          scoreData: checked,
        });
      const matchInformation = await getMatcheInformation();
      setMatchData(matchInformation);
      setMatchSummary({
        fighter: '',
        opponent: '',
        division: '',
        date: '',
        url: '',
        venue: '',
        overview: '',
      });
    } else {
      alert('item is not entered');
    }
    // eslint-disable-next-line
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
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
              name='checked'
              color='primary'
            />
          }
          label='Add Score'
        />
        {!checked && (
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
      {checked && (
        <AddScore
          setChecked={setChecked}
          addChat={addChat}
          fighter={matchSummary.fighter}
          opponent={matchSummary.opponent}
        />
      )}
    </>
  );
});
export default AddMatchInformation;
