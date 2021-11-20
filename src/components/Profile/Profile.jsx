import { useContext } from 'react';
import { AuthStateContext } from '../../providers/AuthStateProvider';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import UserImage from './UserImage';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';
import styled from 'styled-components';

const STitle = styled.div`
  margin-bottom: 16px;
  color: #666666;
  font-weight: bold;
  _:lang(x) + _:-webkit-full-screen-document,
  p {
    letter-spacing: -0.8px;
  }
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
  _:lang(x) + _:-webkit-full-screen-document,
  h3 {
    letter-spacing: -0.8px;
  }
`;

const Profile = () => {
  const { currentUser } = useContext(AuthStateContext);

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
