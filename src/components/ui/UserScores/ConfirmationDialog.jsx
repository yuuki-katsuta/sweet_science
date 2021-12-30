import { memo, useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BaseButton from '../atoms/Button/BaseButton';

const ConfirmationDialog = memo(({ addUserScore }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Fab
        size='small'
        variant='extended'
        sx={{ mt: 3, mb: 7 }}
        onClick={() => {
          handleClickOpen();
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        スコアを送信
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'確認'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {'この内容でスコアカードを追加しますか？？'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BaseButton setState={handleClose}>キャンセル</BaseButton>
          <BaseButton
            setState={() => {
              addUserScore();
              handleClose();
            }}
            autoFocus
          >
            追加
          </BaseButton>
        </DialogActions>
      </Dialog>
    </>
  );
});
export default ConfirmationDialog;
