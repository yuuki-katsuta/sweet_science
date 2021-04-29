import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import FeedbackIcon from '@material-ui/icons/Feedback';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { media } from './Utils/style-utils';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2f384c',
    },
  },
});
const SHeader = styled.div`
  flex-grow: 1;
`;
const STitle = styled(Typography)`
  flex-grow: 1;
`;
const SList = styled(List)`
  margin-top: 64px;
  color: white;
`;
const SListWrapper = styled.div`
  background-color: #213045;
  height: 100%;
  ${media.handheld420`
    width: 200px;
  `}
  width: 250px;
`;
const SListItem = styled(ListItem)`
  padding-bottom: 16px;
  &:hover {
    background-color: #2b4263;
  }
`;
const SHomeIcon = styled(HomeIcon)`
  color: white;
  font-size: 32px;
`;
const SInfoIcon = SHomeIcon.withComponent(InfoIcon);
const SAccountCircleIcon = SHomeIcon.withComponent(AccountCircleIcon);
const SFeedbackIcon = SHomeIcon.withComponent(FeedbackIcon);
const SExitToAppIcon = SHomeIcon.withComponent(ExitToAppIcon);

const Header = () => {
  const { guestUser, signOut } = useContext(AuthContext);
  const history = useHistory();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <SListWrapper
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <SList>
        <SListItem
          button
          onClick={() => {
            history.push('/');
          }}
        >
          <ListItemIcon>
            <SHomeIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </SListItem>
        <SListItem
          button
          onClick={() => {
            history.push('/about');
          }}
        >
          <ListItemIcon>
            <SInfoIcon />
          </ListItemIcon>
          <ListItemText primary={'About'} />
        </SListItem>
        <SListItem
          disabled={guestUser}
          button
          onClick={() => {
            history.push('/profile');
          }}
        >
          <ListItemIcon>
            <SAccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={'Profile'} />
        </SListItem>
        <SListItem
          button
          onClick={() => {
            history.push('/feedback');
          }}
        >
          <ListItemIcon>
            <SFeedbackIcon />
          </ListItemIcon>
          <ListItemText primary={'Feedback'} />
        </SListItem>
        <SListItem
          button
          onClick={async () => {
            await signOut();
            history.push('/auth');
          }}
        >
          <ListItemIcon>
            <SExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={'Log out'} />
        </SListItem>
      </SList>
    </SListWrapper>
  );

  return (
    <ThemeProvider theme={theme}>
      <SHeader>
        <FormGroup></FormGroup>
        <AppBar position='fixed'>
          <Toolbar>
            <STitle variant='h6'>
              <span
                onClick={() => {
                  history.push('/');
                }}
                className='main-title'
              >
                Boxing Lab
              </span>
            </STitle>
            <div>
              <IconButton
                onClick={toggleDrawer('right', true)}
                edge='start'
                color='inherit'
                aria-label='menu'
              >
                <MenuIcon fontSize='large' />
              </IconButton>
              <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                {list('right')}
              </Drawer>
            </div>
          </Toolbar>
        </AppBar>
      </SHeader>
    </ThemeProvider>
  );
};

export default withRouter(Header);
