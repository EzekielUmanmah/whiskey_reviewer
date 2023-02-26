import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Rating } from '@mui/material';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
  const [review, setReview] = useState({
    user_id: JSON.parse(localStorage.getItem('user')).data[0],
    // whiskey_id:
    rating: 2,
  });
  // console.log(JSON.parse(localStorage.getItem('user')).data[0]);
  return (
    <Modal
      open={showReviewModal}
      onClose={() => setShowReviewModal(false)}
      aria-labelledby='whiskey-review-modal'
    >
      <Box sx={{ ...style }}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {/* Your review for {whiskeyData.whiskeyName || ''} */}
        </Typography>
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <Typography component='legend'>Your rating</Typography>
        <Rating
          name='rating'
          value={review.rating}
          onChange={(e, val) =>
            setReview((review) => ({ ...review, rating: e.target.value }))
          }
        />
      </Box>
    </Modal>
  );
}
