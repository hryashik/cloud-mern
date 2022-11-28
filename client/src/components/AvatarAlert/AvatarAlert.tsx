import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeAvatarUserThunk } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/store';

export const AvatarAlert = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputValue('')
  };
  const handleAccept = async () => {
    dispatch(ChangeAvatarUserThunk(inputValue))
    setOpen(false)
    setInputValue('')
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Сменить аватар
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Сменить аватар</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Укажите ссылку на изображение
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Link"
            type="email"
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleAccept}>Изменить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
