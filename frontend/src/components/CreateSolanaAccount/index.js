import React from 'react';
import { Container, Heading, Text, Button } from '@chakra-ui/react';
import { HorizontalHeading } from '../../horizontalHeading';

export default function CreateSolanaAccount() {
  return (
    <>
      <Container
        h='calc(100vh - 140px)'
        d='flex'
        justifyContent='center'
        flexDir='column'
        maxW={{
          base: 'container.sm',
          sm: 'container.sm',
          md: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl',
        }}>
        <Heading as='h2' size='4xl'>
          Do one-time initialization.
        </Heading>
        <Text fontSize='lg'>
          A one-time Account creation is required for storing the music.
        </Text>
        <Button
          colorScheme='blue'
          width='-webkit-fit-content'
          variant='solid'
          size='lg'
          mt='40px'>
          Create Account
        </Button>
      </Container>
      <HorizontalHeading>AcousticLicious</HorizontalHeading>
    </>
  );
}
