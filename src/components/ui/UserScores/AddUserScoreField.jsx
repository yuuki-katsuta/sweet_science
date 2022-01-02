import { useState, useContext } from 'react';
import { RoundData } from '../Utils/util';
import { db } from '../../../base';
import { AuthStateContext } from '../../../providers/AuthStateProvider';
import { createData } from '../Utils/util';
import Container from '@material-ui/core/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import split from 'graphemesplit';
import ConfirmationDialog from './ConfirmationDialog';
import styled from 'styled-components';

const SDescription = styled.div`
  text-align: center;
  margin-bottom: 10px;
  color: #666666;
  font-weight: bold;
  _:lang(x) + _:-webkit-full-screen-document,
  p {
    letter-spacing: -1.5px;
  }
`;

const AddUserScoreField = ({ matchInfo }) => {
  const { currentUser } = useContext(AuthStateContext);
  const [fscore, setFScore] = useState(RoundData);
  const [oscore, setOScore] = useState(RoundData);

  const addUserScore = async () => {
    const fighterLength = split(matchInfo.fighter).length;
    const opponentLength = split(matchInfo.opponent).length;
    const fighterScore = createData(
      `${matchInfo.fighter.slice(0, fighterLength - 1)}`,
      ...Object.values(fscore)
    );
    const opponentScore = createData(
      `${matchInfo.opponent.slice(0, opponentLength - 1)}`,
      ...Object.values(oscore)
    );
    const fighterTotal = Object.values(fscore).reduce((sum, num) => sum + num);
    const opponentTotal = Object.values(oscore).reduce((sum, num) => sum + num);
    await db
      .collection('scorecard')
      .doc(matchInfo.room)
      .collection('score')
      .add({
        user: currentUser.displayName,
        uid: currentUser.uid,
        createdAt: new Date(),
        fighter: fighterScore,
        opponent: opponentScore,
        fighterTotal: fighterTotal,
        opponentTotal: opponentTotal,
      })
      .then(() =>
        alert(
          'スコアカードを追加しました！！\nページを更新すると投稿した内容が表示されます。'
        )
      )
      .catch((error) => alert(error.message));
  };

  return (
    <Container maxWidth='md'>
      <SDescription>
        <p>
          ここからスコアカードを登録できます。
          <br />
          各数字をクリックして数値を選択してください。
          <br />
          そのラウンドが行われなかった場合は、「/」を選択してください。
        </p>
      </SDescription>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='scoreTable' sx={{ minWidth: 150 }}>
                Round
              </TableCell>
              {[...Array(12).keys()].map((round, key) => {
                round++;
                return (
                  <TableCell align='center' key={key} className='scoreTable'>
                    {round}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className='scoreTable-Select'>
                {matchInfo.fighter.slice(
                  0,
                  split(matchInfo.fighter).length - 1
                )}
              </TableCell>
              {Object.keys(RoundData).map((round) => {
                return (
                  <TableCell
                    align='left'
                    key={round}
                    className='scoreTable-Select'
                  >
                    <FormControl variant='filled'>
                      <Select
                        disableUnderline={true}
                        value={fscore[round]}
                        name={round}
                        onChange={(e) => {
                          setFScore({
                            ...fscore,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      >
                        <MenuItem value={''}>/</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell className='scoreTable-Select'>
                {matchInfo.opponent.slice(
                  0,
                  split(matchInfo.opponent).length - 1
                )}
              </TableCell>
              {Object.keys(RoundData).map((round, i) => {
                return (
                  <TableCell
                    align='left'
                    key={round}
                    className='scoreTable-Select'
                  >
                    <FormControl variant='filled'>
                      <Select
                        disableUnderline={true}
                        value={oscore[round]}
                        name={round}
                        onChange={(e) => {
                          setOScore({
                            ...oscore,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      >
                        <MenuItem value={''}>/</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationDialog addUserScore={addUserScore} />
    </Container>
  );
};
export default AddUserScoreField;
