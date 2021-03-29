import React, { useContext, memo } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import LikedCount from './LikedCount';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
    wordBreak: 'break-word',
  },
  Image: {
    width: '11.5vmin',
    height: '11.5vmin',
    border: '1px solid #AAAAAA',
    display: 'inline-block',
    maxWidth: '50px',
    maxHeight: '50px',
  },
}));

const MessageList = memo(({ name, message, uid, photoURL, title, id }) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  return uid === currentUser.uid ? (
    <div>
      <ListItem alignItems='flex-start'>
        <ListItemText
          className='listItem'
          secondary={
            <Typography component='span' variant='body2' color='textPrimary'>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    textAlign: 'left',
                    display: 'inline-block',
                    wordBreak: 'break-word',
                  }}
                >
                  <h4 style={{ textAlign: 'right', margin: '0 0px 3px 0px' }}>
                    {name}
                  </h4>
                  {message.split('\n').map((t, i) => {
                    return <div key={i}>{t}</div>;
                  })}
                </div>
              </div>
            </Typography>
          }
        />
        <LikedCount title={title} id={id} />
        <ListItemIcon
          style={{
            display: 'inline-block',
            textAlign: 'center',
            margin: '4px 0 0 0',
          }}
        >
          <Avatar
            alt='uploaded'
            src={currentUser.photoURL}
            className={classes.Image}
          />
        </ListItemIcon>
      </ListItem>
      <Divider variant='middle' />
    </div>
  ) : (
    <div>
      <ListItem alignItems='flex-start'>
        <ListItemIcon
          style={{
            margin: '4px 0 0 0',
            textAlign: 'center',
            display: 'inline-block',
          }}
        >
          <Avatar alt='uploaded' src={photoURL} className={classes.Image} />
        </ListItemIcon>
        <LikedCount title={title} id={id} />
        <ListItemText
          className='listItem'
          primary={name}
          secondary={
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}
              color='textPrimary'
            >
              {message.split('\n').map((t, i) => {
                return <div key={i}>{t}</div>;
              })}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant='middle' />
    </div>
  );
});
export default MessageList;
