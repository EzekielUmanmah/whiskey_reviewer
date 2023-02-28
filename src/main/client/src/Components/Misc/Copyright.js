import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      <Link
        color='inherit'
        href='https://ezekielt.netlify.app/'
        target='_blank'
      >
        Built with ❤️ by Ezekiel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
