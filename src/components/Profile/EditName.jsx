import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CreateIcon from '@material-ui/icons/Create';
import BaseIconButton from '../Button/BaseIconButton';
import BaseButton from '../Button/BaseButton';
import TextInputField from '../InputField/TextInputField';

const buttonStyle = { margin: '0 0 3px auto' };
const inputFieldWrapper = { textAlign: 'left' };
const buttonWrapper = { textAlign: 'right', marginTop: '16px' };

const EditName = ({ modal, paper, currentUser }) => {
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [name, setName] = useState('');
  const { changeCurrentName } = useContext(AuthContext);
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
      <BaseIconButton
        style={buttonStyle}
        onClickHandler={() => {
          handleOpen();
        }}
      >
        <CreateIcon />
      </BaseIconButton>
      <Modal
        style={modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div style={paper}>
            <div style={inputFieldWrapper}>
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
            </div>
            <div style={buttonWrapper}>
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
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export default EditName;
