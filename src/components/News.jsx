import { memo } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  marginbottom: 12px;
`;
const Heading = styled.p`
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

const FromTimeStampToDate = (date) => {
  const d = new Date(date.seconds * 1000);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  return `${month}/${day}`;
};

const News = memo(({ matchData }) => {
  return (
    <div>
      <h2 className='section-title'>News</h2>
      <Section>
        <Heading>試合情報などが追加されたことをお知らせします。</Heading>
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
            {matchData
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
              .slice(0, 5)
              .map((data, index) => {
                return (
                  <tr key={index}>
                    {
                      <>
                        <td>{FromTimeStampToDate(data.createdAt)}</td>
                        <td>Added {data.title}</td>
                      </>
                    }
                  </tr>
                );
              })}
          </tbody>
        </STable>
      </TableWrapper>
    </div>
  );
});
export default News;
