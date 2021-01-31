import React, { useState } from 'react';
import { db } from '../base';

const MatchInformation = ({ fetchChats }) => {
  const [fighter1, setFighter1] = useState('');
  const [fighter2, setFighter2] = useState('');
  const [division, setiDvision] = useState('');
  const [date, setDate] = useState('');

  //追加
  const addChat = () => {
    db.collection('chats')
      .doc(`${fighter1} vs ${fighter2}`) //ここで入力した名前の組がドキュメント名
      .set({
        fighter1: fighter1,
        fighter2: fighter2,
        division: division,
        date: date,
        createdAt: new Date(),
      })
      .then(async () => {
        const chatNames = await fetchChats();

        //各オブジェクトのkeyを抽出
        const newMatchNames = [];
        chatNames.forEach((_, index) => {
          newMatchNames.push(...Object.keys(chatNames[index]));
        });

        setFighter1('');
        setFighter2('');
        setiDvision('');
        setDate('');
      });
  };

  return (
    <div>
      <div>
        <p>試合名情報</p>

        <p>ファイター1</p>
        <input
          value={fighter1}
          onChange={(e) => {
            setFighter1(e.target.value);
          }}
        />

        <p>ファイター２</p>
        <input
          value={fighter2}
          onChange={(e) => {
            setFighter2(e.target.value);
          }}
        />

        <p>階級</p>
        <input
          value={division}
          onChange={(e) => {
            setiDvision(e.target.value);
          }}
        />

        <p>日程</p>
        <input
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addChat();
          }}
        >
          追加
        </button>
      </div>
    </div>
  );
};
export default MatchInformation;
