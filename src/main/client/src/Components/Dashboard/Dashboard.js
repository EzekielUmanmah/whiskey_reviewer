import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Whiskies from './Whiskies';
import Reviews from './Reviews';
import Copyright from '../Misc/Copyright';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Tumbler } from '../../assets/tumbler.svg';

const theme = createTheme();

export default function Dashboard() {
  const navigate = useNavigate();

  const [isReview, setIsReview] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position='relative' sx={{ backgroundColor: '#edeff2' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tumbler />
          <Box sx={{ display: 'flex', columnGap: '1em' }}>
            <Button
              variant='outlined'
              sx={{ alignContent: 'flex-end' }}
              onClick={() => setIsReview(!isReview)}
            >
              {isReview ? 'Whiskey selection!' : 'Your reviews!'}
            </Button>
            <Button
              variant='outlined'
              sx={{ alignContent: 'flex-end' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {isReview ? (
        <Reviews sx={{ outerHeight: '100vh' }} />
      ) : (
        <Whiskies sx={{ height: '100vh' }} />
      )}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}
