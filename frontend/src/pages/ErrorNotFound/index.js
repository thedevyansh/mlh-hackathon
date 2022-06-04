import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heading, Text, Flex } from '@chakra-ui/react';
import { HorizontalHeading } from '../../horizontalHeading';

function index() {
  return (
    <Flex alignItems='center' flexDirection='column' m='15%'>
      <Helmet>
        <title>404 - Acoustic Licious</title>
      </Helmet>
      <Heading>404</Heading>
      <Text textAlign='center'>
        Oops, the page you're trying to reach doesn't exist :(
      </Text>
      <HorizontalHeading>AcousticLicious</HorizontalHeading>
    </Flex>
  );
}

export default index;
