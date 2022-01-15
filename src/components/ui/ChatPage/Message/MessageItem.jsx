import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../../../store/authState';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import LikedCount from './LikedCount';
import styled from 'styled-components';

const SContainer = styled.div`
  background-color: #fcfcfc;
  &.ownMessage {
    background-color: #f7f7f7;
  }
`;
const SAvatar = styled(Avatar)`
  width: 11.5vmin;
  height: 11.5vmin;
  border: 1px solid #aaaaaa;
  display: inline-block;
  max-width: 50px;
  max-height: 50px;
`;
const SOwnMessage = styled.div`
  text-align: left;
  display: inline-block;
  word-break: break-word;
`;
const SListItemIcon = styled(ListItemIcon)`
  display: inline-block;
  text-align: center;
  margin: 4px 0 0 0;
`;
const SOwnlikedCountWrapper = styled.span`
  display: flex;
  justify-content: flex-end;
`;
const SlikedCountWrapper = styled.span`
  display: flex;
  justify-content: flex-start;
`;
const SMessage = styled.span`
  display: block;
`;
const SMyName = styled.h4`
  text-align: right;
  margin: 0 0px 3px 0px;
`;
const SOwnMessageWrapper = styled.div`
  text-align: right;
`;
const SOtherName = styled.h4`
  margin: 0;
`;
const STypography = styled(Typography)`
  word-break: break-word;
`;

const MessageItem = ({
  message: { message, user: name, uid, photoURL, id, liked },
  room,
}) => {
  const currentUser = useRecoilValue(currentUserState);
  return (
    <SContainer className={uid === currentUser.uid && 'ownMessage'}>
      {uid === currentUser.uid ? (
        <>
          <ListItem alignItems='flex-start'>
            <ListItemText
              className='listItem'
              secondary={
                <Typography
                  component='span'
                  variant='body2'
                  color='textPrimary'
                >
                  <SOwnMessageWrapper>
                    <SOwnMessage>
                      <SMyName>{name || 'ゲストユーザー'}</SMyName>
                      {message.split('\n').map((t, i) => {
                        return <SMessage key={i}>{t}</SMessage>;
                      })}
                      <SOwnlikedCountWrapper>
                        <LikedCount
                          room={room}
                          id={id}
                          userUid={uid}
                          liked={liked}
                        />
                      </SOwnlikedCountWrapper>
                    </SOwnMessage>
                  </SOwnMessageWrapper>
                </Typography>
              }
            />
            <SListItemIcon>
              <SAvatar alt='uploaded' src={currentUser.photoURL} />
            </SListItemIcon>
          </ListItem>
          <Divider variant='fullWidth' />
        </>
      ) : (
        <>
          <ListItem alignItems='flex-start'>
            <SListItemIcon>
              <SAvatar alt='uploaded' src={photoURL} />
            </SListItemIcon>
            <ListItemText
              className='listItem'
              primary={<SOtherName>{name || 'ゲストユーザー'}</SOtherName>}
              secondary={
                <>
                  <STypography
                    component='span'
                    variant='body2'
                    color='textPrimary'
                  >
                    {message.split('\n').map((t, i) => {
                      return <SMessage key={i}>{t}</SMessage>;
                    })}
                  </STypography>
                  <SlikedCountWrapper>
                    <LikedCount
                      room={room}
                      id={id}
                      userUid={currentUser.uid}
                      liked={liked}
                    />
                  </SlikedCountWrapper>
                </>
              }
            />
          </ListItem>
          <Divider variant='fullWidth' />
        </>
      )}
    </SContainer>
  );
};

export default MessageItem;
