import { memo } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
`;
const Tr = styled.tr`
  border-bottom: solid 1px #aaaaaa;
`;
const Th = styled.th`
  text-align: left;
  width: 2vmin;
  padding: 15px 20px 15px 10px;
`;
const Td = styled.td`
  text-align: left;
  padding: 15px 20px 15px 10px;
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
      <h2>News</h2>
      <div
        style={{
          marginBottom: '12px',
          color: '#666666',
          fontWeight: 'bold',
        }}
      >
        <p>試合情報などが追加されたことをお知らせします</p>
      </div>
      <div
        style={{
          margin: '10px 0 56px 0',
          textAlign: 'left',
          display: 'inlineBlock',
        }}
      >
        <Table>
          <thead>
            <Tr>
              <Th>更新日</Th>
              <Th>更新内容</Th>
            </Tr>
          </thead>
          <tbody>
            {matchData.slice(0, 5).map((data, index) => {
              return (
                <Tr key={index}>
                  {
                    <>
                      <Td> {FromTimeStampToDate(data.createdAt)}</Td>
                      <Td>Added {data.title}</Td>
                    </>
                  }
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
});
export default News;
