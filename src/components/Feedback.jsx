import { useState, useContext } from 'react';
import firebase from 'firebase/app';
import { AuthContext } from './../auth/AuthProvider';
import 'firebase/functions';

const containerStyle = { textAlign: 'center', margin: '120px auto 20px' };

const Feedback = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState({
    name: currentUser.displayName ? currentUser.displayName : 'ゲストユーザー',
    message: '',
  });
  return (
    <div style={containerStyle}>
      <h1>フィードバック</h1>
      <textarea
        onChange={(e) => {
          setData({ ...data, message: e.target.value });
        }}
        value={data.message}
      />
      <br />
      <button
        onClick={() => {
          if (data.message.trim() === '') {
            alert('Please enter a message');
            return;
          }
          const sendMail = firebase.functions().httpsCallable('sendMail');
          sendMail(data).then(() => {
            setData({ message: '' });
            alert('フィードバックを送信しました！');
          });
        }}
      >
        送信
      </button>
    </div>
  );
};
export default Feedback;
