import { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { useHistory } from 'react-router-dom';
import BaseButton from './Button/BaseButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const buttonStyle = { marginTop: '20px' };
const containerStyle = { marginTop: '200px', textAlign: 'center' };
const textStyle = {
  marginBottom: '14px',
  color: '#666666',
  fontWeight: 'bold',
};

const Page404 = () => {
  const { isLoading } = useContext(AuthContext);
  const history = useHistory();

  return isLoading ? null : (
    <div style={containerStyle}>
      <h1>404 Not Found</h1>
      <div style={textStyle}>
        <p>
          お探しのページが見つかりませんでした。
          <br />
          URLにお間違いがないか再度ご確認ください。
        </p>
      </div>
      <BaseButton
        style={buttonStyle}
        variant='contained'
        color='default'
        startIcon={<ArrowBackIcon />}
        setState={() => {
          history.push('/');
        }}
      >
        トップページに戻る
      </BaseButton>
    </div>
  );
};
export default Page404;
