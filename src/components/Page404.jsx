import { useContext } from 'react';
import { RootContext } from '../Provider';
import { useHistory } from 'react-router-dom';
import BaseButton from './Button/BaseButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';

const SBackButton = styled(BaseButton)`
  margin-top: 20px;
`;
const SContainer = styled.div`
  margin-top: 200px;
  text-align: center;
`;
const STextWrapper = styled.div`
  margin-bottom: 32px;
  color: #666666;
  font-weight: bold;
`;

const Page404 = () => {
  const { isLoading } = useContext(RootContext);
  const history = useHistory();

  return isLoading ? null : (
    <SContainer>
      <h1>404 Not Found</h1>
      <STextWrapper>
        <p>
          お探しのページが見つかりませんでした。
          <br />
          URLにお間違いがないか再度ご確認ください。
        </p>
      </STextWrapper>
      <SBackButton
        variant='contained'
        color='default'
        startIcon={<ArrowBackIcon />}
        setState={() => {
          history.goBack();
        }}
      >
        直前のページに戻る
      </SBackButton>
    </SContainer>
  );
};
export default Page404;
