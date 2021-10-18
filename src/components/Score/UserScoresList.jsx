import { memo, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../base';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import ScoreListItem from './ScoreListItem';
import Pagination from '@material-ui/lab/Pagination';
import Divider from '@mui/material/Divider';

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
const UserScoresList = memo(({ room }) => {
  const [scorecardList, setScorecardList] = useState([]);
  const [update, setUpdate] = useState(false);
  const page = useRef(1); //ページ番号
  const pageCount = useRef(); //ページ数
  const allItems = useRef([]); //全データ
  const classes = useStyles();

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const querySnapshot = await db
        .collection('scorecard')
        .doc(room)
        .collection('score')
        .get();
      const scoreData = [];
      querySnapshot.forEach((doc) => {
        scoreData.push(doc.data());
      });
      if (!unmounted) {
        allItems.current = scoreData.sort((a, b) =>
          a.createdAt > b.createdAt ? -1 : 1
        );
        //ページカウントの計算
        pageCount.current = Math.ceil(scoreData.length / displayNum);
        //表示データを抽出
        setScorecardList(
          scoreData.slice(
            (page.current - 1) * displayNum,
            page.current * displayNum
          )
        );
      }
    })();
    return () => {
      setUpdate(!update);
      unmounted = true;
    };
  }, [room, update]);

  const handleChange = (event, index) => {
    //ページ移動時にページ番号を更新
    page.current = index;
    //ページ移動時に表示データを書き換える
    setScorecardList(
      allItems.current.slice((index - 1) * displayNum, index * displayNum)
    );
    setUpdate(true);
  };

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
              page={page.current}
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
});
export default UserScoresList;
