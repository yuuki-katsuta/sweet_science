import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

const MessageItem = ({ name, message, uid, currentUser, photoURL }) => {
  const useStyles = makeStyles((theme) => ({
    inline: {
      display: 'inline',
    },
    Image: {
      width: theme.spacing(5.5),
      height: theme.spacing(5.5),
      border: '1px solid #ccc',
    },
  }));
  const classes = useStyles();
  return uid === currentUser.uid ? (
    <div>
      <ListItem alignItems='flex-start'>
        <ListItemText
          secondary={
            <Typography component='span' variant='body2' color='textPrimary'>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    textAlign: 'left',
                    display: 'inline-block',
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
        <div>
          <ListItemIcon
            style={{
              display: 'inline-block',
              textAlign: 'right',
              margin: '4px 0 0 16px',
            }}
          >
            <Avatar
              alt='uploaded'
              src={currentUser.photoURL}
              className={classes.Image}
            />
          </ListItemIcon>
        </div>
      </ListItem>
      <Divider variant='middle' />
    </div>
  ) : (
    <ListItem divider={true} alignItems='flex-start'>
      <ListItemIcon
        style={{
          margin: '4px 16px 0 0',
        }}
      >
        <Avatar alt='uploaded' src={photoURL} className={classes.Image} />
      </ListItemIcon>
      <ListItemText
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
  );
};
export default MessageItem;
