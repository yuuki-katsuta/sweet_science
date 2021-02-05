import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

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
        <AccountCircleIcon fontSize='large' style={{ marginRight: '24px' }} />
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
            {message}
          </Typography>
        }
      />
    </ListItem>
  );
};
export default MessageItem;
