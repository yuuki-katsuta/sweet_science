import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footer: {
    padding: theme.spacing(1, 1),
    marginTop: 'auto',
    backgroundColor: '#4B5667',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'end',
    },
  },
  copyright: {
    color: '#FFFFFF',
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  privacy: {
    color: 'white',
  },
  text: {
    padding: '0 8px',
  },
}));

const Footer = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <span className={classes.copyright}>
          {'Copyright © '}
          {new Date().getFullYear() + '. '}
          boxing Lab
        </span>
        <div className={classes.privacy}>
          <span
            className={classes.text}
            onClick={() => {
              history.push('/terms');
            }}
          >
            利用規約
          </span>
          <span
            className={classes.text}
            onClick={() => {
              history.push('/privacy');
            }}
          >
            プライバシーポリシー
          </span>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
