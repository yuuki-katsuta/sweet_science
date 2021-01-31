import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { db } from '../base';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MatchInformation from './MatchInformation';
import Divider from '@material-ui/core/Divider';

const Home = ({ history }) => {
  const { adminUser } = useContext(AuthContext);
  const [matchInformation, setMatchInformation] = useState([]);

  //テーブルに表示するデータ
  const rows = [...matchInformation];
  const columns = [
    { id: 'id', label: 'ID', minWidth: 120 },
    { id: 'date', label: 'date', minWidth: 150 },
    { id: 'division', label: 'division', minWidth: 170 },
    { id: 'fighter1', label: 'fighter', minWidth: 170 },
    { id: 'fighter2', label: 'fighter', minWidth: 170 },
  ];

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

  //試合情報を取得
  const fetchChats = () => {
    return db
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        const newChats = [];
        querySnapshot.forEach((doc) => {
          newChats.push({ [doc.id]: doc.data() });
        });
        return newChats;
      });
  };

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const chatNames = await fetchChats();

      //試合情報を追加
      const newMatchInformation = [];
      let data = [];
      //console.log(chatNames);
      chatNames.forEach((_, index) => {
        //オブジェクトからvalueを取り出して配列へ格納
        data.push(...Object.values(chatNames[index]));
        newMatchInformation.push({
          id: index,
          title: `${data[index].fighter1} vs ${data[index].fighter2}`,
          date: data[index].date,
          division: data[index].division,
          fighter1: data[index].fighter1,
          fighter2: data[index].fighter2,
        });
      });

      //アンマウントされていなければステートを更新
      if (!unmounted) {
        //setMatches(newMatchNames);
        setMatchInformation(newMatchInformation);
      }
    })();
    //クリーンアップ関数を返す
    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>試合一覧</h2>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={index}
                      onClick={() => {
                        history.push({
                          pathname: `/chat/${index}`,
                          state: { match: row.title }, //ドキュメント名（試合のタイトル名を渡す）
                        });
                      }}
                    >
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={index} align={column.align}>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {adminUser && (
        <div style={{ margin: '50px 0 60px' }}>
          <Divider />
          <MatchInformation fetchChats={fetchChats} />
        </div>
      )}
    </div>
  );
};
export default Home;
