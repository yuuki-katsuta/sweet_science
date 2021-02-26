import React from 'react';

const AddScore = ({
  judgeA,
  judgeB,
  judgeC,
  setJudgeA,
  setJudgeB,
  setJudgeC,
}) => {
  return (
    <div>
      <div>
        <label>レフェリー</label>
        <input
          name='judgeA'
          onChange={(e) => {
            setJudgeA({ ...judgeA, name: e.target.value });
          }}
        />
        <label>fighter</label>
        <input
          name='judgeA'
          onChange={(e) => {
            setJudgeA({
              ...judgeA,
              fighterScore: [e.target.value],
            });
          }}
        />
        <label>opponent</label>
        <input
          name='judgeA'
          onChange={(e) => {
            setJudgeA({
              ...judgeA,
              opponentScore: [e.target.value],
            });
          }}
        />
      </div>
      <div>
        <label>レフェリー</label>
        <input
          name='judgeB'
          onChange={(e) => {
            setJudgeB({ ...judgeB, name: e.target.value });
          }}
        />
        <label>fighter</label>
        <input
          name='judgeB'
          onChange={(e) => {
            setJudgeB({
              ...judgeB,
              fighterScore: [e.target.value],
            });
          }}
        />
        <label>opponent</label>
        <input
          name='judgeB'
          onChange={(e) => {
            setJudgeB({
              ...judgeB,
              opponentScore: [e.target.value],
            });
          }}
        />
      </div>
      <div>
        <label>レフェリー</label>
        <input
          name='judgeC'
          onChange={(e) => {
            setJudgeC({ ...judgeC, name: e.target.value });
          }}
        />
        <label>fighter</label>
        <input
          name='judgeC'
          onChange={(e) => {
            setJudgeC({
              ...judgeC,
              fighterScore: [e.target.value],
            });
          }}
        />
        <label>opponent</label>
        <input
          name='judgeC'
          onChange={(e) => {
            setJudgeC({
              ...judgeC,
              opponentScore: [e.target.value],
            });
          }}
        />
      </div>
    </div>
  );
};
export default AddScore;
