import React from 'react';
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

const MatchList = ({ history, matchData }) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#424242',
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
      maxWidth: '1050px',
      margin: '0 auto',
    },
    container: {
      maxHeight: 700,
    },
  });
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //テーブルに表示するデータ
  const colums = [
    { id: 'date', label: 'Date', minWidth: 140 },
    { id: 'division', label: 'Division', minWidth: 140 },
    { id: 'fighter', label: 'Fighter', minWidth: 180 },
    { id: 'opponent', label: 'Opponent', minWidth: 180 },
    { id: 'venue', label: 'Venue', minWidth: 280 },
  ];
  const ForResponsiveColums = [
    { id: 'date', label: 'Date', minWidth: 120 },
    { id: 'fighter', label: 'Fighter', minWidth: 180 },
    { id: 'opponent', label: 'Opponent', minWidth: 180 },
    { id: 'division', label: 'Division', minWidth: 120 },
    { id: 'venue', label: 'Venue', minWidth: 280 },
  ];
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((match, index) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={index}
                      onClick={() => {
                        history.push({
                          pathname: `/chat/${index}`,
                          state: { matchData: match },
                        });
                      }}
                    >
                      {colums.map((colum, index) => {
                        const value = match[colum.id];
                        return (
                          <TableCell
                            key={index}
                            align={colum.align}
                            style={{ cursor: 'pointer' }}
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
      <MediaQuery query='(min-width: 580px)'>
        <MatchListTable size='medium' colums={colums} />
      </MediaQuery>
    </>
  );
};
export default MatchList;
