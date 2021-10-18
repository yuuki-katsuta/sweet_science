import { memo } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import AddUserScoreField from './AddUserScoreField';
import UserScoresList from './UserScoresList';

const UserScores = memo(() => {
  const location = useLocation();
  const matchInfo = location.state?.matchInfo;

  return location.state ? (
    <div className='container'>
      <h1 className='match-title'>{matchInfo.title}</h1>
      <UserScoresList room={matchInfo.room} />
      <AddUserScoreField matchInfo={matchInfo} />
    </div>
  ) : (
    <Redirect to={'/'} />
  );
});
export default UserScores;
