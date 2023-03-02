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
            {usersReviews?.length < 1 && (
              <Grid item md={5}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component='img'
                    title='example'
                    image='https://potomacwines.com/image/cache/catalog/1650/Knob%20Creek%20Single%20Barrel%20Bourbon-800x1000.jpg'
                    alt='example whiskey review'
                    sx={{
                      pt: '5%',
                      objectFit: 'contain',
                      height: '200px',
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      objectFit: 'contain',
                    }}
                  >
                    <Typography gutterBottom variant='h5' component='h2'>
                      Example Review
                    </Typography>
                    <Typography sx={{ padding: '1em' }}>
                      Start reviewing your own whiskies now by selecting a
                      whiskey! Your reviews will look like this example and you
                      can even edit and delete them!
                    </Typography>
                    <Typography sx={{ fontSize: '.75em' }}>
                      Suggested retail price: 59.99
                    </Typography>
                    <Rating
                      sx={{
                        alignSelf: 'center',
                        marginTop: '1em',
                      }}
                      name='rating'
                      value={4}
                    />
                  </CardContent>
                  <CardActions>
                    <Button size='small' disabled>
                      Edit
                    </Button>
                    <Button size='small' disabled>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}
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
                    sx={{
                      pt: '5%',
                      objectFit: 'contain',
                      height: '200px',
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography gutterBottom variant='h5' component='h2'>
                      {review.whiskeyDTO.name}
                    </Typography>
                    <Typography sx={{ padding: '1em' }}>
                      {review.comments}
                    </Typography>
                    <Typography sx={{ fontSize: '.75em' }}>
                      Suggested retail price: 59.99
                    </Typography>
                    <Rating
                      name='rating'
                      value={review.rating}
                      sx={{ alignSelf: 'center', marginTop: '1em' }}
                    />
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
