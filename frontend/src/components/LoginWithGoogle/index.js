import React from 'react';
import { Box } from '@chakra-ui/react';
import './buttonStyle.css';

const URI =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api/auth/google'
    : 'https://acousticlicious.herokuapp.com/api/auth/google';

function LoginWithGoogle() {
  return (
    <Box align='center' mt='30px'>
      <div
        className='google-btn'
        onClick={() => {
          window.open(URI, '_self');
        }}>
        <div className='google-icon-wrapper'>
          <img
            className='google-icon'
            src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
            alt="Google logo"
          />
        </div>
        <p className='btn-text'>Sign in with Google</p>
      </div>
    </Box>
  );
}

export default LoginWithGoogle;
