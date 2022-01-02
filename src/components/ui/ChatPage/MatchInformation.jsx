import { useEffect, useState } from 'react';
import { storage } from '../../../base';
import RoomIcon from '@material-ui/icons/Room';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';

const SMovieInner = styled.div`
  position: relative;
  padding-top: 56.25%;
`;
const SVideoWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 880px;
`;
const SVideo = styled.video`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;
const SMatchDataWrapper = styled.div`
  p {
    font-weight: 600;
  }
  &.small {
    text-align: left;
    width: 95%;
    margin: 0 auto;
    overflow-x: scroll;
    white-space: nowrap;
  }
  _:lang(x) + _:-webkit-full-screen-document,
  p {
    letter-spacing: -0.9px;
  }
`;
const SContainer = styled.div`
  margin-bottom: 16px;
`;
const SMatchDataWithVideoId = styled.div`
  text-align: right;
  margin-bottom: 8px;
`;

const MatchInformation = ({ matchInfo }) => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (matchInfo.fileName) {
      const storageRef = storage.ref(
        `/videos/${matchInfo.room}/${matchInfo.fileName}`
      );
      storageRef
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [matchInfo]);

  const MatchData = ({ SmallWidth }) => {
    return (
      <SMatchDataWrapper className={SmallWidth && 'small'}>
        <p>
          <span>{matchInfo.date} </span>
          <span>
            <RoomIcon fontSize='small' />
          </span>
          {matchInfo.venue}
        </p>
        {matchInfo.overview.split('\n').map((t, i) => {
          return <p key={i}>{t}</p>;
        })}
      </SMatchDataWrapper>
    );
  };
  return (
    <div>
      <h1 className='match-title'>{matchInfo.title}</h1>
      {matchInfo.fileName ? (
        <div>
          <SVideoWrapper>
            <SMovieInner>
              <SVideo src={url} controls playsinline></SVideo>
            </SMovieInner>
            <SMatchDataWithVideoId>
              <MatchData />
            </SMatchDataWithVideoId>
          </SVideoWrapper>
        </div>
      ) : (
        <SContainer>
          <MediaQuery query='(max-width: 460px)'>
            <MatchData SmallWidth />
          </MediaQuery>
          <MediaQuery query='(min-width: 461px)'>
            <MatchData />
          </MediaQuery>
        </SContainer>
      )}
    </div>
  );
};
export default MatchInformation;
