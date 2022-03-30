import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../../store/authState';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
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
  margin-bottom: 10px;
`;
const SListItemIcon = styled(ListItemIcon)`
  display: inline-block;
  text-align: center;
  margin: 4px 0 0 0;
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
const SOtherMessageWrapper = styled.div`
  margin-bottom: 10px;
  word-break: break-word;
`;

const MessageItem = ({ message: { message, user: name, uid, photoURL } }) => {
  const currentUser = useRecoilValue(currentUserState);
  return (
    <SContainer className={uid === currentUser.uid && 'ownMessage'}>
      {uid === currentUser.uid ? (
        <ListItem alignItems='flex-start'>
          <ListItemText
            className='listItem'
            secondary={
              <Typography component='span' variant='body2' color='textPrimary'>
                <SOwnMessageWrapper>
                  <SOwnMessage>
                    <SMyName>{name || 'ゲストユーザー'}</SMyName>
                    {message.split('\n').map((t, i) => {
                      return <SMessage key={i}>{t}</SMessage>;
                    })}
                  </SOwnMessage>
                </SOwnMessageWrapper>
              </Typography>
            }
          />
          <SListItemIcon>
            <SAvatar alt='uploaded' src={currentUser.photoURL} />
          </SListItemIcon>
        </ListItem>
      ) : (
        <ListItem alignItems='flex-start'>
          <SListItemIcon>
            <SAvatar alt='uploaded' src={photoURL} />
          </SListItemIcon>
          <ListItemText
            className='listItem'
            primary={<SOtherName>{name || 'ゲストユーザー'}</SOtherName>}
            secondary={
              <Typography component='span' variant='body2' color='textPrimary'>
                <SOtherMessageWrapper>
                  {message.split('\n').map((t, i) => {
                    return <SMessage key={i}>{t}</SMessage>;
                  })}
                </SOtherMessageWrapper>
              </Typography>
            }
          />
        </ListItem>
      )}
      <Divider variant='fullWidth' />
    </SContainer>
  );
};

export default MessageItem;
