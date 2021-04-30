import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import InputField from '../InputField/InputField';

const SContainer = styled.div`
  margin-bottom: 80px;
`;
const SFormWrapper = styled.div`
  margin: 16px auto 0;
`;
const SSubmitWrapper = styled.div`
  position: relative;
`;
const STooltip = styled(Tooltip)`
  position: absolute;
  right: 0;
`;
const SInputField = styled(InputField)`
  width: 280px;
  margin: 16px;
`;
export { SContainer, SFormWrapper, SSubmitWrapper, STooltip, SInputField };
