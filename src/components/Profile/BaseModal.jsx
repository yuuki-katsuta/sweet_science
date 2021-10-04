import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components';

const SModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  _:lang(x) + _:-webkit-full-screen-document,
  h3 {
    letter-spacing: -0.8px;
  }
`;
const SPaper = styled.div`
  height: auto;
  width: 40%;
  min-width: 270px;
  max-width: 650px;
  background-color: white;
  border: 2px solid #000;
  padding: 16px 32px 24px;
`;

const BaseModal = ({ children, open }) => {
  return (
    <SModal
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <SPaper>{children}</SPaper>
      </Fade>
    </SModal>
  );
};

export default BaseModal;
