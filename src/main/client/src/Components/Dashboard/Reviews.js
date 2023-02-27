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
import { deleteReviewByReviewId, getAllReviewsByUser } from '../../api/api';
import { Rating } from '@mui/material';
import EditReviewModal from './EditReviewModal';

const theme = createTheme();

export default function Reviews() {
  const [usersReviews, setUsersReviews] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editWhiskey, setEditWhiskey] = useState();

  useEffect(() => {
    getAllReviewsByUser(JSON.parse(localStorage.getItem('userId'))).then(
      (res) => setUsersReviews(res.data)
    );
  }, []);

  const handleDelete = (reviewId) => {
    deleteReviewByReviewId(reviewId).then((res) => {
      if (res.data[0] === 'Review deleted!') {
        getAllReviewsByUser(JSON.parse(localStorage.getItem('userId'))).then(
          (res) => setUsersReviews(res.data)
        );
      } else {
        alert('Review could not be deleted!');
      }
    });
  };
  const handleEdit = (reviewId) => {
    usersReviews.map(
      (review) => review.id === reviewId && setEditWhiskey(review)
    );
    setShowEditModal(true);
  };

  const setReviewsAfterUpdate = (data) => setUsersReviews(data);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <EditReviewModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          whiskeyData={editWhiskey}
          setReviewsAfterUpdate={setReviewsAfterUpdate}
        />
        <Container sx={{ py: 8, minHeight: '90vh' }} maxWidth='md'>
          <Grid container spacing={4}>
            {usersReviews?.map((review) => (
              <Grid item key={review.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component='img'
                    title={review.name}
                    image={review.whiskeyDTO.imgURL}
                    alt='whiskey review'
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {review.whiskeyDTO.name}
                    </Typography>
                    <Typography>{review.comments}</Typography>
                    <Rating name='rating' value={review.rating} />
                  </CardContent>
                  <CardActions>
                    <Button size='small' onClick={() => handleEdit(review.id)}>
                      Edit
                    </Button>
                    <Button
                      size='small'
                      onClick={() => handleDelete(review.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
