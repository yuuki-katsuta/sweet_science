import { useEffect, useState } from 'react';
import { db } from '../base';

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

  console.log(schedule.sort((a, b) => (a.date > b.date ? 1 : -1)));
  return (
    <div style={{ margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ marginTop: '200px' }}>スケジュール</h2>
      <p></p>
    </div>
  );
};
export default Schedule;
