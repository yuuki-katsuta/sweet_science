import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const MessageItem = ({ name, message }) => {
  const useStyles = makeStyles(() => ({
    inline: {
      display: 'inline',
    },
  }));
  const classes = useStyles();
  return (
    <ListItem divider={true} alignItems='flex-start'>
      <ListItemIcon>
        <AccountCircleIcon
          fontSize='large'
          style={{ margin: '0 24px 0 12px' }}
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
