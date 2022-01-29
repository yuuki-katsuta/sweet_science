import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import ScrollToTop from '../../ScrollToTop';
import { PrivacyText } from '../ui/text/PrivacyText';
const SContainer = styled(Container)`
  margin: 120px auto 40px;
`;

const Privacy = () => {
  return (
    <>
      <ScrollToTop />
      <SContainer maxWidth='md'>
        <PrivacyText />
      </SContainer>
    </>
  );
};
export default Privacy;
