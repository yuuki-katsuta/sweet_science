import { memo } from 'react';
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242',
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

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: '10px',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const ScoreTable = memo(({ Scoring }) => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell className='scoreTable'>Round</StyledTableCell>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((round, key) => {
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
            {Scoring.map((row) => {
              return (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row' className='scoreTable'>
                    {row.name}
                  </TableCell>
                  {[
                    'one',
                    'two',
                    'three',
                    'four',
                    'five',
                    'six',
                    'seven',
                    'eight',
                    'nine',
                    'ten',
                    'eleven',
                    'twelve',
                  ].map((number, key) => {
                    return (
                      <TableCell align='right' key={key} className='scoreTable'>
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
  );
});
export default ScoreTable;
