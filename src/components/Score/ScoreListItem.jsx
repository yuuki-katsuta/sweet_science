import { memo, useContext } from 'react';
import { RootContext } from '../../Provider';
import {
  makeStyles,
  createTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import { NumberOfRounds } from './Utils/util';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Chip from '@mui/material/Chip';

const theme = createTheme({
  palette: {
    primary: {
      main: '#213045',
    },
  },
  overrides: {
    MuiTableCell: {
      root: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 8,
        '&:last-child': {
          paddingRight: 8,
        },
      },
    },
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 15.5,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const SDescription = styled.div`
  text-align: left;
  margin-bottom: 0;
  color: #666666;
  font-weight: bold;
  _:lang(x) + _:-webkit-full-screen-document,
  p {
    letter-spacing: -1.5px;
  }
`;

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: '10px',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  wrapper: {
    marginBottom: '24px',
  },
});

const ScoreListItem = memo(({ scoreData }) => {
  const { currentUser } = useContext(RootContext);
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <SDescription>
        ユーザー名: {scoreData.user || 'ゲストユーザー'}
        {currentUser.uid === scoreData.uid && (
          <>
            {' '}
            <Chip
              label='my scorecard'
              color='success'
              size='small'
              variant='outlined'
            />
          </>
        )}
      </SDescription>
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead className='tableHead'>
              <TableRow>
                <StyledTableCell>Round</StyledTableCell>
                {[...Array(12).keys()].map((round, key) => {
                  round++;
                  return (
                    <StyledTableCell
                      align='right'
                      key={key}
                      className='scoreTable'
                    >
                      {round}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {[scoreData.fighter, scoreData.opponent].map((row) => {
                return (
                  <TableRow key={row.name}>
                    <TableCell
                      component='th'
                      scope='row'
                      className='scoreTable'
                    >
                      {row.name}
                    </TableCell>
                    {NumberOfRounds.map((number, key) => {
                      return (
                        <TableCell
                          align='right'
                          key={key}
                          className='scoreTable'
                        >
                          {row[number]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </MuiThemeProvider>
    </div>
  );
});
export default ScoreListItem;
