import { useState, useContext } from 'react';
import { AuthContext } from './../auth/AuthProvider';
import firebase from 'firebase/app';
import 'firebase/functions';
import TextInputField from './InputField/TextInputField';
import BaseButton from './Button/BaseButton';

const containerStyle = { textAlign: 'center', margin: '120px auto 20px' };
const textStyle = {
  marginBottom: '14px',
  color: '#666666',
  fontWeight: 'bold',
};
const TextFieldStyle = {
  width: '95%',
  maxWidth: '580px',
  marginTop: '24px',
};
const buttonStyle = {
  marginTop: '16px',
};

const Feedback = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState({
    name: currentUser.displayName ? currentUser.displayName : 'ゲストユーザー',
    message: '',
  });
  return (
    <div style={containerStyle}>
      <h2>フィードバック送信</h2>
      <div style={textStyle}>
        <p>
          機能追加の要望やバグ報告にご協力ください。 <br />
          送信された内容はアプリ運営者のみ確認可能です。
        </p>
      </div>
      <TextInputField
        id='outlined-multiline-static'
        label='バグ報告・要望・感想など'
        multiline
        variant='outlined'
        setState={(e) => {
          setData({ ...data, message: e.target.value });
        }}
        value={data.message}
        style={TextFieldStyle}
        rows={8}
      />
      <br />
      <BaseButton
        style={buttonStyle}
        color='primary'
        variant='contained'
        setState={() => {
          if (data.message.trim() === '') {
            alert('Please enter a message');
            return;
          }
          const sendMail = firebase.functions().httpsCallable('sendMail');
          sendMail(data).then(() => {
            alert('フィードバックを送信しました！');
            setData({ ...data, message: '' });
          });
        }}
      >
        フィードバックを送信
      </BaseButton>
    </div>
  );
};
export default Feedback;
