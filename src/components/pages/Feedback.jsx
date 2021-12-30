import { useState, useContext } from 'react';
import { AuthStateContext } from '../../providers/AuthStateProvider';
import firebase from 'firebase/app';
import 'firebase/functions';
import TextInputField from '../ui/atoms/InputField/TextInputField';
import BaseButton from '../ui/atoms/Button/BaseButton';
import styled from 'styled-components';

const SContainer = styled.div`
  text-align: center;
  margin: 120px auto 20px;
  _:lang(x) + _:-webkit-full-screen-document,
  h2 {
    letter-spacing: -1.5px;
  }
`;
const STextWrapper = styled.div`
  margin-bottom: 14px;
  color: #666666;
  font-weight: bold;
  _:lang(x) + _:-webkit-full-screen-document,
  p {
    letter-spacing: -0.9px;
  }
`;
const STextInputField = styled(TextInputField)`
  width: 95%;
  max-width: 580px;
  margin-top: 24px;
`;
const SSendButton = styled(BaseButton)`
  margin-top: 24px;
`;

const Feedback = () => {
  const { currentUser } = useContext(AuthStateContext);
  const [data, setData] = useState({
    name: currentUser.displayName || 'ゲストユーザー',
    message: '',
  });
  return (
    <SContainer>
      <h2>フィードバック送信</h2>
      <STextWrapper>
        <p>
          機能追加の要望やバグ報告にご協力ください。 <br />
          送信された内容はアプリ運営者のみ確認可能です。
        </p>
      </STextWrapper>
      <STextInputField
        id='outlined-multiline-static'
        label='バグ報告・要望・感想など'
        multiline
        variant='outlined'
        setState={(e) => {
          setData({ ...data, message: e.target.value });
        }}
        value={data.message}
        rows={8}
      />
      <div>
        <SSendButton
          variant='contained'
          setState={async () => {
            try {
              if (data.message.trim() === '')
                throw new Error('Please enter a message');
              const sendMail = firebase.functions().httpsCallable('sendMail');
              await sendMail(data);
              alert('フィードバックを送信しました！');
              setData({ ...data, message: '' });
            } catch (e) {
              alert(e.message);
            }
          }}
        >
          フィードバックを送信
        </SSendButton>
      </div>
    </SContainer>
  );
};
export default Feedback;
