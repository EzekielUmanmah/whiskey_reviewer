import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Rating } from '@mui/material';
import { useEffect, useState } from 'react';
import { addReview } from '../../api/api';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AddReviewModal({
  showReviewModal,
  whiskeyData,
  setShowReviewModal,
}) {
  const initialState = {
    userDTO: {
      id: parseInt(JSON.parse(localStorage.getItem('user'))),
    },
    whiskeyDTO: { id: whiskeyData ? whiskeyData.id : '' },
    rating: 2,
    comments: '',
  };
  const [review, setReview] = useState(initialState);

  useEffect(() => {
    setReview((prev) => ({ ...prev, whiskeyDTO: { id: whiskeyData?.id } }));
  }, [whiskeyData?.id]);

  const handleSubmit = () => {
    addReview(review);
    setShowReviewModal(false);
    setReview(initialState);
  };

  return (
    <Modal
      open={showReviewModal}
      onClose={() => {
        setShowReviewModal(false);
        setReview(initialState);
      }}
      aria-labelledby='whiskey-review-modal'
    >
      <Grid container maxWidth='sm'>
        <Box sx={{ ...modalStyle }}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Your review for {whiskeyData?.name || ''}
          </Typography>
          <Grid container direction='column' alignItems='center' rowGap={5}>
            <TextareaAutosize
              maxLength={400}
              minRows={8}
              style={{ width: '100%', marginTop: '2em' }}
              required
              aria-label='whiskey review'
              placeholder='Your review...'
              value={review?.comments}
              onChange={(e) =>
                setReview((prev) => ({ ...prev, comments: e.target.value }))
              }
            />
            <Typography component='legend'>Your rating</Typography>
            <Rating
              name='rating'
              value={review?.rating}
              onChange={(e) =>
                setReview((review) => ({
                  ...review,
                  rating: parseInt(e.target.value),
                }))
              }
            />
            <Grid item xs={12}>
              <Button variant='outlined' onClick={handleSubmit}>
                Add Your Review!
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Modal>
  );
}
