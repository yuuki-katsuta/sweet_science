import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import UserImage from './UserImage';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';

const title = {
  marginBottom: '16px',
  color: '#666666',
  fontWeight: 'bold',
};
const profileItemStyle = {
  display: 'flex',
  alignItems: 'center',
};
const profileItemWrapper = {
  width: '35%',
  margin: '0 auto ',
  textAlign: 'left',
  minWidth: '300px',
};

const Profile = () => {
  const { guestUser, currentUser } = useContext(AuthContext);

  return guestUser ? (
    <Redirect to={'/'} />
  ) : (
    currentUser.email && currentUser.displayName && (
      <div className='container'>
        <Container maxWidth='md'>
          <h2>Your Profile</h2>
          <div style={title}>
            <p>プロフィール情報を編集することができます</p>
          </div>
          <UserImage />
          <div style={profileItemWrapper}>
            <div style={profileItemStyle}>
              <EditName currentUser={currentUser} />
            </div>
            <div style={profileItemStyle}>
              <EditEmail currentUser={currentUser} />
            </div>
          </div>
          <EditPassword />
        </Container>
      </div>
    )
  );
};
export default Profile;
