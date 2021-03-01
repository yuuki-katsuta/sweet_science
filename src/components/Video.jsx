import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';

const Video = ({ matchData }) => {
  const useStyles = makeStyles({
    movieInner: {
      position: 'relative',
      paddingTop: '56.25%',
    },
    videoWrapper: {
      width: '95%',
      margin: '0 auto',
      maxWidth: '830px',
    },
    video: {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '100%',
      height: '100%',
      border: 'medium solid #666666',
    },
    titleFont: {
      fontFamily: 'Lato',
    },
  });

  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.titleFont}>{matchData.title}</h1>
      {matchData.videoId ? (
        <div>
          <div className={classes.videoWrapper}>
            <div className={classes.movieInner}>
              <iframe
                className={classes.video}
                title={matchData.title}
                width='560'
                height='315'
                src={`https://www.youtube.com/embed/${matchData.videoId}`}
                frameBorder='1'
                allowFullScreen
              ></iframe>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p>
                {matchData.date}
                <span>
                  <RoomIcon fontSize='small' />
                </span>
                {matchData.venue}
              </p>
              {matchData.overview.split('\n').map((t, i) => {
                return <p key={i}>{t}</p>;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: '24px' }}>
          <div>
            <p>
              <span>{matchData.date} </span>
              <span>
                <RoomIcon fontSize='small' />
              </span>
              {matchData.venue}
            </p>
            {matchData.overview.split('\n').map((t, i) => {
              return <p key={i}>{t}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Video;
