import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItemList from './MenuItemList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2f384c',
    },
  },
});
const useStyles = makeStyles({
  paper: {
    background: '#213045',
  },
});

const SHeader = styled.div`
  flex-grow: 1;
`;
const STitle = styled(Typography)`
  flex-grow: 1;
`;
const Header = () => {
  const classes = useStyles();
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
                classes={{ paper: classes.paper }}
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                <MenuItemList
                  anchor='right'
                  toggleDrawer={toggleDrawer}
                  history={history}
                />
              </Drawer>
            </div>
          </Toolbar>
        </AppBar>
      </SHeader>
    </ThemeProvider>
  );
};

export default withRouter(Header);
