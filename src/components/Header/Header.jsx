import React, { useContext } from 'react';
import { auth } from '../../base';
import { withRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242',
    },
  },
});

const Header = ({ history }) => {
  const { currentUser, setAdminUser, setGuestUser, guestUser } = useContext(
    AuthContext
  );
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return currentUser ? (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <FormGroup></FormGroup>
        <AppBar position='fixed'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              <span
                onClick={() => {
                  history.push('/');
                }}
                className={'title'}
              >
                Boxing Lab
              </span>
            </Typography>
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle fontSize='large' />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <span
                    onClick={() => {
                      history.push('/about');
                    }}
                  >
                    About
                  </span>
                </MenuItem>
                <MenuItem onClick={handleClose} disabled={guestUser}>
                  <span
                    onClick={() => {
                      history.push('/profile');
                    }}
                  >
                    Profile
                  </span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <span
                    onClick={async () => {
                      await auth.signOut().then(() => {
                        setAdminUser(false);
                        setGuestUser(false);
                      });
                      history.push('/auth');
                    }}
                  >
                    Log out
                  </span>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  ) : null;
};

export default withRouter(Header);
