import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { withStyles, makeStyles, createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { removeEmoji } from '../Utils/util';
import { db } from '../../../base';
import useSWR from 'swr';

const theme = createTheme({
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
    color: '#444444',
    borderBlockColor: 'inherit',
    [theme.breakpoints.down('xs')]: {
      fontSize: '13.3px',
    },
    fontWeight: 'bold',
  },
}));
const getMatcheInformation = async () => {
  const querySnapshot = await db
    .collection('chats')
    .orderBy('date', 'desc')
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get();
  const newMatcheInformation = [];
  querySnapshot.forEach((doc) => {
    if (doc.data()?.isCanceled === true) return;
    newMatcheInformation.push(doc.data());
  });
  return newMatcheInformation;
};

const useMatchData = (page) => {
  const { data, error } = useSWR(
    page !== null ? `firestore/chat/${page}` : null,
    getMatcheInformation,
    { revalidateOnFocus: false, suspense: true }
  );
  return {
    matchData: data,
    isError: error,
  };
};
const rowsPerPage = 10;

const MatchListTable = ({ size, colums }) => {
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const currentPage = history.location.state?.currentPage;
    setPage(currentPage || 0);
  }, [history]);
  const { matchData, isError } = useMatchData(page);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (isError) return <div>failed to load</div>;
  if (!matchData) return null;
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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => {
                data.removeEmojivenue = removeEmoji(data.venue);
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={index}
                    onClick={() => {
                      history.push({
                        pathname: `/chat/${index}`,
                        state: {
                          matchInformation: data,
                          page: page,
                        },
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
        component='div'
        count={matchData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[0]}
      />
    </Paper>
  );
};
export default MatchListTable;
