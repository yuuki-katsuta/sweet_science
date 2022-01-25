import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { RoundData } from '../Utils/util';
import { db } from '../../../base';
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
import { currentUserState } from '../../../store/authState';
import { useSWRConfig } from 'swr';
import { useAlert } from 'react-alert';

const SDescription = styled.div`
  text-align: center;
  margin-bottom: 10px;
  color: #666666;
  font-weight: bold;
`;

const AddUserScoreField = ({ matchInfo, page }) => {
  const Alert = useAlert();
  const { mutate } = useSWRConfig();
  const currentUser = useRecoilValue(currentUserState);
  const [fscore, setFScore] = useState(RoundData);
  const [oscore, setOScore] = useState(RoundData);

  const calcTotal = (score) => {
    return Object.values(score)
      .filter((n) => n !== '')
      .reduce((sum, num) => sum + num);
  };

  const createScoreData = (boxerName, score) => {
    const nameLength = split(boxerName).length;
    return createData(
      `${boxerName.slice(0, nameLength - 1)}`,
      ...Object.values(score)
    );
  };

  const addUserScore = async () => {
    const fighterScore = createScoreData(matchInfo.fighter, fscore);
    const opponentScore = createScoreData(matchInfo.opponent, oscore);
    const fighterTotal = calcTotal(fscore);
    const opponentTotal = calcTotal(oscore);
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
      .then(() => {
        Alert.success('スコアカードを追加しました!!');
        mutate(`firestore/chat/${matchInfo.room}/userScore/${page}`);
      })
      .catch((error) => alert(error.message));
  };

  const ScoreRow = ({ name, score, setScore }) => {
    return (
      <TableRow>
        <TableCell className='scoreTable-Select'>
          {name.slice(0, split(name).length - 1)}
        </TableCell>
        {Object.keys(RoundData).map((round) => {
          return (
            <TableCell align='left' key={round} className='scoreTable-Select'>
              <FormControl variant='filled'>
                <Select
                  disableUnderline={true}
                  value={score[round]}
                  name={round}
                  onChange={(e) => {
                    setScore({
                      ...score,
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
    );
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
            <ScoreRow
              name={matchInfo.fighter}
              score={fscore}
              setScore={setFScore}
            />
            <ScoreRow
              name={matchInfo.opponent}
              score={oscore}
              setScore={setOScore}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationDialog addUserScore={addUserScore} />
    </Container>
  );
};
export default AddUserScoreField;
