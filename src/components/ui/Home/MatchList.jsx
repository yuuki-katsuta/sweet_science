import { memo } from 'react';
import MediaQuery from 'react-responsive';
import MatchListTable from './MatchListTable';

//テーブルに表示するデータ
const colums = [
  { id: 'date', label: '日付', minWidth: 120 },
  { id: 'division', label: '階級', minWidth: 130 },
  { id: 'japaneseNotationFighter', label: '試合', minWidth: 260 },
  { id: 'japaneseNotationOpponent', label: '', minWidth: 260 },
  { id: 'removeEmojivenue', label: '開催地', minWidth: 300 },
];
const ForResponsiveColums = [
  { id: 'omittedDate', label: '日付', minWidth: 68 },
  { id: 'japaneseNotationFighter', label: '試合', minWidth: 230 },
  { id: 'japaneseNotationOpponent', label: '', minWidth: 230 },
  { id: 'division', label: '階級', minWidth: 130 },
  { id: 'removeEmojivenue', label: '開催地', minWidth: 300 },
];

const MatchList = memo(() => {
  return (
    <>
      <MediaQuery query='(max-width: 580px)'>
        <MatchListTable size='small' colums={ForResponsiveColums} />
      </MediaQuery>
      <MediaQuery query='(min-width: 581px)'>
        <MatchListTable size='medium' colums={colums} />
      </MediaQuery>
    </>
  );
});
export default MatchList;
