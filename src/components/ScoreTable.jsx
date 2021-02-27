import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const ScoreTable = ({ Scoring }) => {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ marginBottom: '14px' }}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Round</TableCell>
            <TableCell align='right'>1</TableCell>
            <TableCell align='right'>2</TableCell>
            <TableCell align='right'>3</TableCell>
            <TableCell align='right'>4</TableCell>
            <TableCell align='right'>5</TableCell>
            <TableCell align='right'>6</TableCell>
            <TableCell align='right'>7</TableCell>
            <TableCell align='right'>8</TableCell>
            <TableCell align='right'>9</TableCell>
            <TableCell align='right'>10</TableCell>
            <TableCell align='right'>11</TableCell>
            <TableCell align='right'>12</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Scoring.map((row) => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.one}</TableCell>
              <TableCell align='right'>{row.two}</TableCell>
              <TableCell align='right'>{row.three}</TableCell>
              <TableCell align='right'>{row.four}</TableCell>
              <TableCell align='right'>{row.five}</TableCell>
              <TableCell align='right'>{row.six}</TableCell>
              <TableCell align='right'>{row.seven}</TableCell>
              <TableCell align='right'>{row.eight}</TableCell>
              <TableCell align='right'>{row.nine}</TableCell>
              <TableCell align='right'>{row.ten}</TableCell>
              <TableCell align='right'>{row.eleven}</TableCell>
              <TableCell align='right'>{row.twelve}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ScoreTable;
