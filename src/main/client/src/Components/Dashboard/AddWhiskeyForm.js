import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import { addWhiskey, getAllWhiskies } from '../../api/api';

const initialState = {
  name: '',
  price: '',
  imgURL: '',
  description: '',
};

export default function AddWhiskeyForm({ setAllWhiskies }) {
  const [newWhiskey, setNewWhiskey] = useState(initialState);

  const handleSubmit = () => {
    addWhiskey(newWhiskey).then(() =>
      getAllWhiskies().then((res) => {
        setAllWhiskies(res.data);
        setNewWhiskey(initialState);
      })
    );
  };

  return (
    <Grid container direction='column' alignItems='center'>
      <Grid>
        <Typography variant='h6' gutterBottom>
          Add a new whiskey!
        </Typography>
      </Grid>
      <Grid container spacing={3} maxWidth='sm' sx={{ marginBottom: '4em' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(e) =>
              setNewWhiskey((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            required
            id='whiskeyName'
            name='whiskeyName'
            label='Whiskey name'
            fullWidth
            variant='standard'
            value={newWhiskey.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(e) =>
              setNewWhiskey((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
            required
            id='price'
            name='price'
            label='Price'
            fullWidth
            variant='standard'
            value={newWhiskey.price}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) =>
              setNewWhiskey((prev) => ({
                ...prev,
                imgURL: e.target.value,
              }))
            }
            required
            id='image'
            name='image'
            label='Image URL'
            fullWidth
            variant='standard'
            value={newWhiskey.imgURL}
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            onChange={(e) =>
              setNewWhiskey((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            maxLength={400}
            aria-label='whiskey description'
            minRows={8}
            placeholder='Enter description'
            style={{ width: '100%' }}
            value={newWhiskey.description}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' onClick={handleSubmit}>
            Add Whiskey!
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
