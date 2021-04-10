import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CreateIcon from '@material-ui/icons/Create';
import BaseIconButton from '../Button/BaseIconButton';
import BaseButton from '../Button/BaseButton';
import TextInputField from '../InputField/TextInputField';

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
        style={{ margin: '0 0 3px auto' }}
        onClickHandler={() => {
          handleOpen();
        }}
      >
        <CreateIcon />
      </BaseIconButton>
      <Modal
        className={modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={paper}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <h3>Please enter a new Name</h3>
                <br />
                <TextInputField
                  fullWidth
                  id={'standard-name-required'}
                  name={'name'}
                  type={'name'}
                  value={name}
                  setState={setName}
                  placeholder={currentUser.displayName}
                />
              </div>
              <div style={{ textAlign: 'right', marginTop: '16px' }}>
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
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export default EditName;
