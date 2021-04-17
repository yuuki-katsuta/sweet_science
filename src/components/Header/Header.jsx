import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../base';
import { withRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BaseIconButton from '../Button/BaseIconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2f384c',
    },
  },
});
const headerStyle = {
  flexGrow: 1,
};
const titleStyle = {
  flexGrow: 1,
};

const Header = () => {
  const { currentUser, setAdminUser, setGuestUser, guestUser } = useContext(
    AuthContext
  );
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    currentUser && (
      <ThemeProvider theme={theme}>
        <div style={headerStyle}>
          <FormGroup></FormGroup>
          <AppBar position='fixed'>
            <Toolbar>
              <Typography variant='h6' style={titleStyle}>
                <span
                  onClick={() => {
                    history.push('/');
                  }}
                  className='main-title'
                >
                  Boxing Lab
                </span>
              </Typography>
              <div>
                <BaseIconButton onClickHandler={handleMenu} color='inherit'>
                  <AccountCircle fontSize='large' />
                </BaseIconButton>
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
                      onClick={() => {
                        history.push('/feedback');
                      }}
                    >
                      Feedback
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
    )
  );
};

export default withRouter(Header);
