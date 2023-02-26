import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Whiskies from './Whiskies';
import Reviews from './Reviews';
import Copyright from '../Misc/Copyright';
import { Button } from '@mui/material';

const theme = createTheme();

const initialState = {
  name: '',
  price: null,
  url: '',
  description: '',
};

export default function Dashboard() {
  const [isReview, setIsReview] = useState(false);
  const [newWhiskey, setNewWhiskey] = useState(initialState);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position='relative'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant='h6' color='inherit' noWrap>
            {isReview ? 'Your reviews!' : 'Choose a whiskey to review!'}
          </Typography>
          <Button
            variant='contained'
            sx={{ backgroundColor: 'brown' }}
            onClick={() => setIsReview(!isReview)}
          >
            {isReview ? 'Go to whiskey selection!' : 'See your reviews!'}
          </Button>
        </Toolbar>
      </AppBar>
      {isReview ? <Reviews /> : <Whiskies />}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}
