import { memo } from 'react';
import RoomIcon from '@material-ui/icons/Room';
import MediaQuery from 'react-responsive';

const movieInner = {
  position: 'relative',
  paddingTop: '56.25%',
};
const videoWrapper = {
  width: '100%',
  margin: '0 auto',
  maxWidth: '830px',
};
const video = {
  position: 'absolute',
  top: '0',
  right: '0',
  width: '100%',
  height: '100%',
  border: '1px solid #111111',
};
const matchDataForSmall = { textAlign: 'left', width: '95%', margin: '0 auto' };
const containerStyle = { marginBottom: '24px' };

const MatchInformation = memo(({ matchData }) => {
  const MatchData = ({ SmallWidth }) => {
    return (
      <div style={SmallWidth && matchDataForSmall}>
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
    );
  };
  return (
    <div>
      <h1 className='match-title'>{matchData.title}</h1>
      {matchData.videoId ? (
        <div>
          <div style={videoWrapper}>
            <div style={movieInner}>
              <iframe
                style={video}
                title={matchData.title}
                width='560'
                height='315'
                src={`https://www.youtube.com/embed/${matchData.videoId}`}
                frameBorder='1'
                allowFullScreen
              ></iframe>
            </div>
            <div style={{ textAlign: 'right' }}>
              <MatchData />
            </div>
          </div>
        </div>
      ) : (
        <div style={containerStyle}>
          <MediaQuery query='(max-width: 580px)'>
            <MatchData SmallWidth />
          </MediaQuery>
          <MediaQuery query='(min-width: 581px)'>
            <MatchData />
          </MediaQuery>
        </div>
      )}
    </div>
  );
});
export default MatchInformation;
