import { useRecoilValue } from 'recoil';
import { Redirect } from 'react-router-dom';
import { currentUserState } from '../../store/authState';
import Container from '@material-ui/core/Container';
import UserImage from '../ui/Profile/UserImage';
import EditName from '../ui/Profile/EditName';
import EditEmail from '../ui/Profile/EditEmail';
import EditPassword from '../ui/Profile/EditPassword';
import styled from 'styled-components';

const STitle = styled.div`
  margin-bottom: 16px;
  color: #666666;
  font-weight: bold;
`;
const SProfileItem = styled.div`
  display: flex;
  align-items: center;
`;
const SProfileItemWrapper = styled.div`
  margin: 0 auto;
  text-align: left;
  overflow-x: scroll;
  white-space: nowrap;
  width: 100%;
  max-width: 300px;
`;

const Profile = () => {
  const currentUser = useRecoilValue(currentUserState);

  return currentUser.isAnonymous ? (
    <Redirect to={'/'} />
  ) : (
    <div className='container'>
      <Container maxWidth='md'>
        <h2 className='section-title'>Your Profile</h2>
        <STitle>
          <p>プロフィール情報を編集することができます</p>
        </STitle>
        <UserImage />
        <SProfileItemWrapper>
          <SProfileItem>
            <EditName />
          </SProfileItem>
          <SProfileItem>
            <EditEmail />
          </SProfileItem>
        </SProfileItemWrapper>
        <EditPassword />
      </Container>
    </div>
  );
};
export default Profile;
