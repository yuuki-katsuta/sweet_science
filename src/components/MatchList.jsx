import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

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
    },
    container: {
      maxHeight: 440,
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
  const columns = [
    { id: 'date', label: 'date', minWidth: 140 },
    { id: 'division', label: 'division', minWidth: 140 },
    { id: 'fighter', label: 'fighter', minWidth: 180 },
    { id: 'opponent', label: 'opponent', minWidth: 180 },
    { id: 'venue', label: 'venue', minWidth: 180 },
  ];
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='customized table'>
          <ThemeProvider theme={theme}>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <StyledTableCell
                    key={index}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
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
                    {columns.map((column, index) => {
                      const value = match[column.id];
                      return (
                        <TableCell
                          key={index}
                          align={column.align}
                          style={{ cursor: 'pointer' }}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
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
export default MatchList;
