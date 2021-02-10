import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const MessageItem = ({ name, message, uid, currentUser }) => {
  const useStyles = makeStyles(() => ({
    inline: {
      display: 'inline',
    },
  }));
  const classes = useStyles();
  return uid === currentUser.uid ? (
    <div>
      <ListItem divider={true} alignItems='flex-start'>
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
                  <h4 style={{ textAlign: 'right', margin: '0 0px 6px 0px' }}>
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
              marginTop: '4px',
            }}
          >
            <AccountCircleIcon fontSize='large' />
          </ListItemIcon>
        </div>
      </ListItem>
    </div>
  ) : (
    <ListItem divider={true} alignItems='flex-start'>
      <ListItemIcon>
        <AccountCircleIcon
          fontSize='large'
          style={{ margin: '0 24px 0 0px' }}
        />
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
