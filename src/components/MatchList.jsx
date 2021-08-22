import { useHistory } from 'react-router-dom';
import { useState, memo } from 'react';
import {
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MediaQuery from 'react-responsive';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2f384c',
    },
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: '#EEEEEE',
    fontSize: 15.5,
    fontWeight: 'bold',
    [theme.breakpoints.down('581')]: {
      paddingLeft: '8px',
    },
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '1150px',
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      padding: '0 3px',
    },
  },
  container: {
    maxHeight: 900,
  },
  tableCell: {
    cursor: 'pointer',
    fontWeight: '600',
    color: '#555555',
  },
}));

//テーブルに表示するデータ
const colums = [
  { id: 'date', label: 'Date', minWidth: 140 },
  { id: 'division', label: 'Division', minWidth: 140 },
  { id: 'fighter', label: 'Fighter', minWidth: 180 },
  { id: 'opponent', label: 'Opponent', minWidth: 180 },
  { id: 'venue', label: 'Venue', minWidth: 300 },
];
const ForResponsiveColums = [
  { id: 'date', label: 'Date', minWidth: 110 },
  { id: 'title', label: 'Fight', minWidth: 330 },
  { id: 'division', label: 'Division', minWidth: 120 },
  { id: 'venue', label: 'Venue', minWidth: 300 },
];

const MatchList = memo(({ matchData }) => {
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const MatchListTable = ({ size, colums }) => {
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='a dense table' size={size}>
            <ThemeProvider theme={theme}>
              <TableHead>
                <TableRow>
                  {colums.map((colum, index) => (
                    <StyledTableCell
                      key={index}
                      align={colum.align}
                      style={{ minWidth: colum.minWidth }}
                    >
                      {colum.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
            </ThemeProvider>
            <TableBody>
              {matchData
                .sort((a, b) => (a.date > b.date ? -1 : 1))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, index) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={index}
                      onClick={() => {
                        history.push({
                          pathname: `/chat/${index}`,
                          state: { matchInformation: data },
                        });
                      }}
                    >
                      {colums.map((colum, index) => {
                        const value = data[colum.id];
                        return (
                          <TableCell
                            key={index}
                            align={colum.align}
                            className={classes.tableCell}
                          >
                            {colum.format && typeof value === 'number'
                              ? colum.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={matchData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  };
  return (
    <>
      <MediaQuery query='(max-width: 580px)'>
        <MatchListTable size='small' colums={ForResponsiveColums} />
      </MediaQuery>
      <MediaQuery query='(min-width: 581px)'>
        <MatchListTable size='medium' colums={colums} />
      </MediaQuery>
    </>
  );
});
export default MatchList;
