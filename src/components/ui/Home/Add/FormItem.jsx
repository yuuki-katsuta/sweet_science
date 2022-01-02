import { useState } from 'react';
import { useAddRoom } from '../../../hooks/useAddRoom';
import AddScoreForm from './AddScoreForm';
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

const FormItem = ({ matchSummary }) => {
  const [isAddScore, setIsAddScore] = useState(false);
  const [isAddAvg, setIsAddAvg] = useState(false);
  const addRoom = useAddRoom;

  return (
    <>
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
                addRoom(matchSummary);
              }}
            >
              <AddIcon />
            </Fab>
          </STooltip>
        )}
      </SFormItemWrapper>
      {isAddScore && (
        <AddScoreForm matchSummary={matchSummary} addRoom={addRoom} />
      )}
      {isAddAvg && (
        <AddAvgScoreForm matchSummary={matchSummary} addRoom={addRoom} />
      )}
    </>
  );
};
export default FormItem;
