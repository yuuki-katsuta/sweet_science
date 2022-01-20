import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../base';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import ScoreListItem from '../ui/UserScores/ScoreListItem';
import Pagination from '@material-ui/lab/Pagination';
import Divider from '@mui/material/Divider';
import useSWR from 'swr';
import { Redirect, useLocation } from 'react-router-dom';
import AddUserScoreField from '../ui/UserScores/AddUserScoreField';

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

const UserScores = () => {
  const [page, setPage] = useState(1); //ページ番号
  const classes = useStyles();
  const location = useLocation();
  const matchInfo = location.state?.matchInfo;

  const fetchUserScore = async () => {
    const querySnapshot = await db
      .collection('scorecard')
      .doc(matchInfo.room)
      .collection('score')
      .orderBy('createdAt', 'desc')
      .get();
    const scoreData = [];
    querySnapshot.forEach((doc) => {
      scoreData.push(doc.data());
    });
    return scoreData;
  };
  const useUserScoreData = (page) => {
    const { data, error } = useSWR(
      matchInfo ? `firestore/chat/${matchInfo.room}/userScore/${page}` : null,
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
  return location.state ? (
    <div className='container'>
      <h1 className='match-title'>{matchInfo.title}</h1>
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
            {scorecardList
              .slice(
                (page - 1) * displayNum,
                (page - 1) * displayNum + displayNum
              )
              .map((scorecard, index) => (
                <ScoreListItem scoreData={scorecard} key={index} />
              ))}
            <div className={classes.pagenation}>
              <Pagination
                count={Math.ceil(scorecardList.length / displayNum)}
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
      <AddUserScoreField matchInfo={matchInfo} page={page} />
    </div>
  ) : (
    <Redirect to={'/'} />
  );
};
export default UserScores;
