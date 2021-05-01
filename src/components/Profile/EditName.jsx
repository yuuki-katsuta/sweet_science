import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import CreateIcon from '@material-ui/icons/Create';
import BaseIconButton from '../Button/BaseIconButton';
import BaseButton from '../Button/BaseButton';
import TextInputField from '../InputField/TextInputField';
import BaseModal from './BaseModal.jsx';
import styled from 'styled-components';

const SIconButton = styled(BaseIconButton)`
  margin: 0 0 3px auto;
`;
const SButtonWrapper = styled.div`
  text-align: right;
  margin-top: 16px;
`;
const SInputField = styled.div`
  text-align: left;
`;

const EditName = () => {
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [name, setName] = useState('');
  const { changeCurrentName, currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setIsNameChanged(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setIsNameChanged(true);
  };
  const resetState = () => {
    handleClose();
    setName('');
  };

  return (
    <>
      <h3>
        Name:&nbsp;&nbsp;
        {!name || isNameChanged ? currentUser.displayName : name}
      </h3>
      <SIconButton
        onClickHandler={() => {
          handleOpen();
        }}
      >
        <CreateIcon />
      </SIconButton>
      <BaseModal open={open}>
        <SInputField>
          <h3>Please enter a new Name</h3>
          <br />
          <TextInputField
            fullWidth
            id='standard-name-required'
            name='name'
            type='name'
            value={name}
            setState={(e) => {
              setName(e.target.value);
            }}
            placeholder={currentUser.displayName}
          />
        </SInputField>
        <SButtonWrapper>
          <BaseButton
            setState={() => {
              resetState();
            }}
          >
            Cancel
          </BaseButton>
          <BaseButton
            color='primary'
            setState={async () => {
              await changeCurrentName(name);
              resetState();
            }}
          >
            Save
          </BaseButton>
        </SButtonWrapper>
      </BaseModal>
    </>
  );
};
export default EditName;
