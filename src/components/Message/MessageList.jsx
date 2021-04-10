import { memo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import LikedCount from './LikedCount';

const inlineStyle = {
  display: 'inline',
  wordBreak: 'break-word',
};
const imageStyle = {
  width: '11.5vmin',
  height: '11.5vmin',
  border: '1px solid #AAAAAA',
  display: 'inline-block',
  maxWidth: '50px',
  maxHeight: '50px',
};
const ownMessageStyle = {
  textAlign: 'left',
  display: 'inline-block',
  wordBreak: 'break-word',
};
const listItemIconStyle = {
  display: 'inline-block',
  textAlign: 'center',
  margin: '4px 0 0 0',
};
const likedCountWrapper = { display: 'flex', justifyContent: 'flex-end' };
const nameStyle = { textAlign: 'right', margin: '0 0px 3px 0px' };
const ownMessageWrapper = { textAlign: 'right' };
const otherNamesStyle = { margin: '0' };

const MessageList = memo(
  ({
    message: { message, user: name, uid, photoURL, id },
    currentUser,
    title,
  }) => {
    return uid === currentUser.uid ? (
      <div>
        <ListItem alignItems='flex-start'>
          <ListItemText
            className='listItem'
            secondary={
              <Typography component='span' variant='body2' color='textPrimary'>
                <div style={ownMessageWrapper}>
                  <div style={ownMessageStyle}>
                    <h4 style={nameStyle}>{name ? name : 'ゲストユーザー'}</h4>
                    {message.split('\n').map((t, i) => {
                      return <div key={i}>{t}</div>;
                    })}
                    <span style={likedCountWrapper}>
                      <LikedCount
                        title={title}
                        id={id}
                        currentUser={currentUser}
                      />
                    </span>
                  </div>
                </div>
              </Typography>
            }
          />
          <ListItemIcon style={listItemIconStyle}>
            <Avatar
              alt='uploaded'
              src={currentUser.photoURL}
              style={imageStyle}
            />
          </ListItemIcon>
        </ListItem>
        <Divider variant='middle' />
      </div>
    ) : (
      <div>
        <ListItem alignItems='flex-start'>
          <ListItemIcon style={listItemIconStyle}>
            <Avatar alt='uploaded' src={photoURL} style={imageStyle} />
          </ListItemIcon>
          <ListItemText
            className='listItem'
            primary={
              <h4 style={otherNamesStyle}>{name ? name : 'ゲストユーザー'}</h4>
            }
            secondary={
              <Typography
                component='span'
                variant='body2'
                style={inlineStyle}
                color='textPrimary'
              >
                {message.split('\n').map((t, i) => {
                  return <div key={i}>{t}</div>;
                })}
                <span>
                  <LikedCount title={title} id={id} currentUser={currentUser} />
                </span>
              </Typography>
            }
          />
        </ListItem>
        <Divider variant='middle' />
      </div>
    );
  }
);
export default MessageList;
