import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AddWhiskeyForm from './AddWhiskeyForm';
import AddReviewModal from './AddReviewModal';
import { getAllWhiskies } from '../../api/api';

const theme = createTheme();

export default function Whiskies() {
  const [allWhiskies, setAllWhiskies] = useState();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [whiskeyData, setWhiskeyData] = useState();

  useEffect(() => {
    getAllWhiskies().then((res) => setAllWhiskies(res.data));
  }, []);

  const getAllWhiskiesAfterAddingNewWhiskey = (data) => setAllWhiskies(data);

  // console.log(allWhiskies);

  const handleReview = (card) => {
    setWhiskeyData(card);
    setShowReviewModal(true);
  };

  const formatWhiskies = allWhiskies?.map((card) => (
    <Grid item key={card.id} xs={12} sm={6} md={4}>
      <Card
        raised
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component='img'
          sx={{
            pt: '5%',
            objectFit: 'contain',
            height: '200px',
          }}
          image={card.imgURL}
          title={card.name}
          alt={card.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant='h5' component='h2'>
            {card.name}
          </Typography>
          <Typography>{card.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={() => handleReview(card)}>
            Review
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <AddReviewModal
          showReviewModal={showReviewModal}
          whiskeyData={whiskeyData}
          setShowReviewModal={setShowReviewModal}
        />
        <Container sx={{ py: 8, minHeight: '90vh' }} maxWidth='lg'>
          <AddWhiskeyForm
            setAllWhiskies={getAllWhiskiesAfterAddingNewWhiskey}
          />
          <Grid container spacing={4}>
            {formatWhiskies}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
