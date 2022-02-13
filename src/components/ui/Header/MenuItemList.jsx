import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import FeedbackIcon from '@material-ui/icons/Feedback';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { useHistory } from 'react-router-dom';
import { media } from '../Utils/style-utils';
import { signOut } from '../../../controllers/AuthController';
import { useAlert } from 'react-alert';
import { useRecoilValue } from 'recoil';
import { guestUserState } from '../../../store/authState';
import MediaQuery from 'react-responsive';

const SList = styled(List)`
  margin-top: 50px;
  color: white;
`;
const SListWrapper = styled.div`
  ${media.handheld420`
    width: 200px;
  `}
  width: 250px;
`;
const SListItem = styled(ListItem)`
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    background-color: #2b4263;
  }
`;
const SHomeIcon = styled(HomeIcon)`
  color: white;
  font-size: 32px;
`;
const STextWrapper = styled.div`
  padding: 16px;
  border-top: solid 1px #485a60;
  display: flex;
  flex-direction: column;
  span {
    padding: 3px;
    cursor: pointer;
    width: fit-content;
    &:hover {
      color: #c0c0c0;
    }
  }
`;

const SInfoIcon = SHomeIcon.withComponent(InfoIcon);
const SAccountCircleIcon = SHomeIcon.withComponent(AccountCircleIcon);
const SFeedbackIcon = SHomeIcon.withComponent(FeedbackIcon);
const SExitToAppIcon = SHomeIcon.withComponent(ExitToAppIcon);
const SEventNoteIcon = SHomeIcon.withComponent(EventNoteIcon);

const MenuItemList = ({ anchor, toggleDrawer }) => {
  const history = useHistory();
  const Alert = useAlert();
  const guestUser = useRecoilValue(guestUserState);
  return (
    <SListWrapper
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <SList>
        <SListItem
          button
          onClick={() => {
            history.push('/');
          }}
        >
          <ListItemIcon>
            <SHomeIcon />
          </ListItemIcon>
          <ListItemText primary={'ホーム'} />
        </SListItem>
        <SListItem
          button
          onClick={() => {
            history.push('/about');
          }}
        >
          <ListItemIcon>
            <SInfoIcon />
          </ListItemIcon>
          <ListItemText primary={'基礎知識'} />
        </SListItem>
        <SListItem
          disabled={guestUser}
          button
          onClick={() => {
            history.push('/profile');
          }}
        >
          <ListItemIcon>
            <SAccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={'プロフィール'} />
        </SListItem>
        <SListItem
          button
          onClick={() => {
            history.push('/schedule');
          }}
        >
          <ListItemIcon>
            <SEventNoteIcon />
          </ListItemIcon>
          <ListItemText primary={'スケジュール'} />
        </SListItem>
        <SListItem
          button
          onClick={() => {
            history.push('/feedback');
          }}
        >
          <ListItemIcon>
            <SFeedbackIcon />
          </ListItemIcon>
          <ListItemText primary={'フィードバック'} />
        </SListItem>
        <SListItem button onClick={() => signOut(Alert)}>
          <ListItemIcon>
            <SExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={'ログアウト'} />
        </SListItem>

        <MediaQuery query='(max-width: 580px)'>
          <STextWrapper>
            <span onClick={() => history.push('/terms')}>利用規約</span>
            <span onClick={() => history.push('/privacy')}>
              プライバシーポリシー
            </span>
          </STextWrapper>
        </MediaQuery>
      </SList>
    </SListWrapper>
  );
};
export default MenuItemList;
