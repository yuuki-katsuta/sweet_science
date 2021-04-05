import { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Page404 = () => {
  const { isLoading } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  return isLoading ? null : (
    <div style={{ marginTop: '200px', textAlign: 'center' }}>
      <h1>404 Not Found</h1>
      <div
        style={{
          marginBottom: '14px',
          color: '#666666',
          fontWeight: 'bold',
        }}
      >
        <p>
          お探しのページが見つかりませんでした。
          <br />
          URLにお間違いがないか再度ご確認ください。
        </p>
      </div>
      <Button
        style={{ marginTop: '20px' }}
        variant='contained'
        color='default'
        className={classes.button}
        startIcon={<ArrowBackIcon />}
        onClick={() => {
          history.push('/');
        }}
      >
        トップページに戻る
      </Button>
    </div>
  );
};
export default Page404;
