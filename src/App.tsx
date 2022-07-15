import './App.css';
import { Container, Button } from '@mui/material';
import { SignUpModal } from './components/SignUpModal';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      p: 10,
    }}>
      <Button type='button' variant='contained' onClick={handleClickOpen} sx={{
        textAlign: 'center',
      }}>Зарегистрироваться</Button>
      <SignUpModal open={open} onClose={handleClose} />
    </Container>
  );
}

export default App;
