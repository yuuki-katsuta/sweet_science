import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import ScrollToTop from '../../ScrollToTop';
import { TermsText } from '../ui/text/TermsText';
const SContainer = styled(Container)`
  margin: 120px auto 40px;
`;
const Terms = () => {
  return (
    <>
      <ScrollToTop />
      <SContainer maxWidth='md'>
        <TermsText />
      </SContainer>
    </>
  );
};
export default Terms;
