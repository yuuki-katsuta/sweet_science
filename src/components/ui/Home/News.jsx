import { db } from '../../../base';
import useSWR from 'swr';
import styled from 'styled-components';
import { removeEmoji } from '../Utils/util';

const Section = styled.div`
  marginbottom: 12px;
`;
const Heading = styled.div`
  color: #666666;
  font-weight: bold;
`;
const TableWrapper = styled.div`
  margin: 10px 0 56px 0;
  textalign: left;
  display: inlineBlock;
`;
const STable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  tr {
    border-bottom: solid 1px #aaaaaa;
  }
  th {
    text-align: left;
    padding: 15px 5vmin 15px 18px;
  }
  td {
    text-align: left;
    padding: 15px 5vmin 15px 18px;
    color: #666666;
    font-weight: bold;
  }
  tbody tr {
    &:hover {
      background-color: #f7f7f7;
    }
  }
`;

const getLimitedMatcheInformation = async () => {
  const querySnapshot = await db
    .collection('chats')
    .orderBy('createdAt', 'desc')
    .limit(5)
    .get();
  const newMatcheInformation = [];
  querySnapshot.forEach((doc) => {
    if (doc.data()?.isCanceled === true) return;
    newMatcheInformation.push(doc.data());
  });
  return newMatcheInformation;
};

const useLimitedMatchData = () => {
  const { data, error } = useSWR(
    'firestore/chats/limit',
    getLimitedMatcheInformation,
    { suspense: true, revalidateOnFocus: false }
  );
  return {
    limitedMatchData: data,
    isError: error,
  };
};

const FromTimeStampToDate = (date) => {
  const d = new Date(date.seconds * 1000);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  return `${month}/${day}`;
};

const News = () => {
  const { limitedMatchData, isError } = useLimitedMatchData();
  if (isError) return <div>failed to load</div>;
  return (
    <div>
      <h2 className='section-title'>News</h2>
      <Section>
        <Heading>
          <p>試合情報などが追加されたことをお知らせします。</p>
        </Heading>
      </Section>
      <TableWrapper>
        <STable>
          <thead>
            <tr>
              <th>日付</th>
              <th>更新内容</th>
            </tr>
          </thead>
          <tbody>
            {limitedMatchData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{FromTimeStampToDate(data.createdAt)}</td>
                  <td>追加 : {removeEmoji(data.title)}</td>
                </tr>
              );
            })}
          </tbody>
        </STable>
      </TableWrapper>
    </div>
  );
};
export default News;
