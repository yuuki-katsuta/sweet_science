import { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/collection/96198332)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));
const SWrapper = styled.div`
  margin-top: 180px;
  text-align: center;
`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, currentUser } = useContext(AuthContext);
  const classes = useStyles();

  return isLoading ? (
    <SWrapper>
      <CircularProgress />
    </SWrapper>
  ) : currentUser ? (
    <Redirect to={'/'} />
  ) : (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {isLogin ? (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Log in
            </Typography>
            <LoginForm setIsLogin={setIsLogin} isLogin={isLogin} />
          </div>
        ) : (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <SignupForm setIsLogin={setIsLogin} isLogin={isLogin} />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default withRouter(Auth);
