import React from 'react';
import { Avatar, MenuButton, HStack, Button, Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { BsMusicNoteList } from 'react-icons/bs';

const URI =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/solana-music'
    : 'https://acousticlicious.netlify.com/solana-music';

const UserIcon = ({ isLoaded, isAuth, image }) => {
  if (!isLoaded) {
    return null;
  } else if (isAuth) {
    return (
      <>
        <Tooltip hasArrow label='Solana Music'>
          <Button
            variant='ghost'
            mr={2}
            onClick={() => {
              window.open(URI, '_self');
            }}>
            <BsMusicNoteList size={25} />
          </Button>
        </Tooltip>
        <MenuButton display='flex' alignItems='center'>
          <Avatar size='sm' bg='gray.800' src={image} />
        </MenuButton>
      </>
    );
  } else {
    return (
      <HStack>
        <Tooltip hasArrow label='Solana Music'>
          <Button
            variant='ghost'
            mr={2}
            onClick={() => {
              window.open(URI, '_self');
            }}>
            <BsMusicNoteList size={25} />
          </Button>
        </Tooltip>
        <Link to='/register'>
          <Button leftIcon={<FaUserAlt />} variant='ghost' fontWeight='10px'>
            Register
          </Button>
        </Link>
        <Link to='/login'>
          <Button leftIcon={<FaSignInAlt />} variant='ghost' fontWeight='10px'>
            Login
          </Button>
        </Link>
      </HStack>
    );
  }
};

export default UserIcon;
