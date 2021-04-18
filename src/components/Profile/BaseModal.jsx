import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const modal = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const paper = {
  height: 'auto',
  width: '40%',
  minWidth: '270px',
  maxWidth: '650px',
  backgroundColor: 'white',
  border: '2px solid #000',
  padding: '16px 32px 24px',
};

const BaseModal = ({ children, open }) => {
  return (
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
        <div style={paper}>{children}</div>
      </Fade>
    </Modal>
  );
};

export default BaseModal;
