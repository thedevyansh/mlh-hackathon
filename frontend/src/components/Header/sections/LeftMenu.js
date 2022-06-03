import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from './acousticsLogo.png'

function LeftMenu() {
  return (
    <Flex align='center'>
      <Image src={logo} alt='Acoustic Licious Logo' w='40px' mr={2} />
      <Text fontSize='xl'>
        <Link to='/'>Acoustic Licious</Link>
      </Text>
    </Flex>
  );
}

export default LeftMenu;
