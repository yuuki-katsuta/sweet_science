import { db } from '../../base';
import { media } from '../ui/Utils/style-utils';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PlaceIcon from '@material-ui/icons/Place';
import TvIcon from '@material-ui/icons/Tv';
import useSWR from 'swr';
import ScrollToTop from '../../ScrollToTop';

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

const getDay = () => {
  const date = new Date();
  return (
    date.getFullYear() +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    ('0' + date.getDate()).slice(-2)
  );
};

const fetchScheduleData = async (isMounted) => {
  const day = getDay();
  const ｍatchSchedule = await db
    .collection('schedule')
    .where('date', '>=', `${day}`)
    .get();
  const scheduleData = [];
  ｍatchSchedule.forEach((doc) => {
    scheduleData.push(doc.data());
  });
  return scheduleData;
};
const Schedule = () => {
  const useScheduleData = () => {
    const { data, error } = useSWR('firestore/schedule', fetchScheduleData, {
      suspense: true,
      revalidateOnFocus: false,
    });
    return {
      scheduleData: data,
      isError: error,
    };
  };
  const { scheduleData, isError } = useScheduleData();

  if (isError) return <div>failed to load</div>;
  return (
    <div>
      <ScrollToTop />
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
          {scheduleData.map((information) => (
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
                  }
                />
              </SListItem>
            </div>
          ))}
        </SList>
      </div>
    </div>
  );
};
export default Schedule;
