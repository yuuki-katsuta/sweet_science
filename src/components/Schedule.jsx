import { useEffect, useState } from 'react';
import { db } from '../base';
import { media } from '../style-utils';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PlaceIcon from '@material-ui/icons/Place';
import TvIcon from '@material-ui/icons/Tv';

const SDescription = styled.div`
  margin-bottom: 16px;
  color: #666666;
  font-weight: bold;
`;

const SList = styled(List)`
  width: 100%;
  max-width: 1050px;
  background-color: white;
  margin: 0 auto;
`;
const STypography = styled(Typography)`
  display: flex;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;
const SSecondary = styled.span`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;
const SPrimaryText = styled.span`
  display: flex;
  flex-wrap: wrap;
  ${media.handheld710`
  flex-direction: column;
  `}
`;
const STitle = styled.h2`
  margin: 16px 0 10px 0;
  ${media.handheld710`
  margin: 0 0 4px 0;
  font-size: 20px
  `}
`;
const SDate = styled.h2`
  letter-spacing: -0.02em;
  margin: 16px 32px 10px 0;
  opacity: 0.8;
  ${media.handheld710`
  margin: 0 ;
  font-size: 18px
  `}
`;
const SListItem = styled(ListItem)`
  width: 95%;
  margin: 0 auto;
  SVG {
    margin-right: 7px;
  }
`;

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const date = new Date();
      const today =
        date.getFullYear() +
        '/' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + date.getDate()).slice(-2);

      const ｍatchSchedule = await db
        .collection('schedule')
        .where('date', '>=', `${today}`)
        .get();
      const scheduleData = [];
      ｍatchSchedule.forEach((doc) => {
        scheduleData.push(doc.data());
      });
      !unmounted && setSchedule(scheduleData);
    })();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div className='container'>
      <h2 className='section-title'>Fight Schedule</h2>
      <SDescription>
        <p>
          ボクシングの試合予定を表示します。
          <br />
          (日時は現地時間を記載しています。)
        </p>
      </SDescription>
      <SList>
        {schedule.map((information) => (
          <div key={information.title}>
            <Divider />
            <SListItem alignItems='flex-start'>
              <ListItemText
                primary={
                  <SPrimaryText>
                    <SDate>{information.date}</SDate>
                    <STitle>{information.title}</STitle>
                  </SPrimaryText>
                }
                secondary={
                  <>
                    <STypography
                      component='span'
                      color='textPrimary'
                      variant='body2'
                    >
                      <SSecondary>
                        <QueryBuilderIcon fontSize='small' />
                        {information.time}
                      </SSecondary>
                      <SSecondary>
                        <PlaceIcon fontSize='small' />
                        {information.venue}
                      </SSecondary>
                      <SSecondary>
                        <TvIcon fontSize='small' />
                        {information.broadcast}
                      </SSecondary>
                    </STypography>
                  </>
                }
              />
            </SListItem>
          </div>
        ))}
      </SList>
    </div>
  );
};
export default Schedule;
