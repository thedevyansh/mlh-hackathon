import React from 'react';
import { Avatar, MenuButton, HStack, Button, Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { BsMusicNoteList } from 'react-icons/bs';

const UserIcon = ({ isLoaded, isAuth, image }) => {
  if (!isLoaded) {
    return null;
  } else if (isAuth) {
    return (
      <>
        <Link to='/solana-music'>
          <Tooltip hasArrow label='Solana Music'>
            <Button variant='ghost' mr={2}>
              <BsMusicNoteList size={25} />
            </Button>
          </Tooltip>
        </Link>
        <MenuButton display='flex' alignItems='center'>
          <Avatar size='sm' bg='gray.800' src={image} />
        </MenuButton>
        <Link to='/solana-music'>
          <Button variant='ghost' ml={2}>
            <IoIosMusicalNote size={25} />
          </Button>
        </Link>
      </>
    );
  } else {
    return (
      <HStack>
        <Link to='/solana-music'>
          <Tooltip hasArrow label='Solana Music'>
            <Button variant='ghost'>
              <BsMusicNoteList size={25} />
            </Button>
          </Tooltip>
        </Link>
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
        <Link to='/solana-music'>
          <Button variant='ghost'>
            <IoIosMusicalNote size={25} />
          </Button>
        </Link>
      </HStack>
    );
  }
};

export default UserIcon;
