import { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../../base';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import ScoreListItem from './ScoreListItem';
import Pagination from '@material-ui/lab/Pagination';
import Divider from '@mui/material/Divider';
import useSWR from 'swr';

const SContainer = styled(Container)`
  margin-bottom: 32px;
`;

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
const displayNum = 5; //1ページあたりの項目数
const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  pagenation: {
    '& > *': {
      marginTop: theme.spacing(2),
      display: 'inline-block',
    },
  },
}));

const UserScoresList = ({ room }) => {
  const [page, setPage] = useState(1); //ページ番号
  const pageCount = useRef(); //ページ数
  const classes = useStyles();

  const fetchUserScore = async () => {
    const querySnapshot = await db
      .collection('scorecard')
      .doc(room)
      .collection('score')
      .orderBy('createdAt', 'desc')
      .get();
    const scoreData = [];
    querySnapshot.forEach((doc) => {
      scoreData.push(doc.data());
    });
    //ページカウントの計算
    pageCount.current = Math.ceil(scoreData.length / displayNum);
    //表示データを抽出
    return scoreData.slice((page - 1) * displayNum, page * displayNum);
  };
  const useUserScoreData = (page) => {
    const { data, error } = useSWR(
      `firestore/chat/${room}/userScore/`,
      fetchUserScore,
      { suspense: true }
    );
    return {
      scorecardList: data,
      isError: error,
    };
  };
  const handleChange = (event, index) => setPage(index);
  const { scorecardList, isError } = useUserScoreData(page);

  if (isError) return <div>failed to load</div>;
  return (
    <SContainer maxWidth='md'>
      <SDescription>
        <p>
          スコアカード一覧
          <br />
          投稿されたスコアカードを表示します。
        </p>
      </SDescription>
      {scorecardList.length > 0 && (
        <>
          {scorecardList.map((scorecard, index) => (
            <ScoreListItem scoreData={scorecard} key={index} />
          ))}
          <div className={classes.pagenation}>
            <Pagination
              count={pageCount.current}
              page={page}
              variant='outlined'
              color='primary'
              size='small'
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <Divider sx={{ mt: 7 }} />
    </SContainer>
  );
};
export default UserScoresList;
