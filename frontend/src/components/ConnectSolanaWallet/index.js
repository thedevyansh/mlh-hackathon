import React from 'react';
import { Container, Heading, Text, Button, Image } from '@chakra-ui/react';
import { HorizontalHeading } from '../../horizontalHeading';
import { BiWallet } from 'react-icons/bi';
import solanaLogo from './solanaLogo.png';

export default function ConnectSolanaWallet() {
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
        <Image boxSize='50px' src={solanaLogo} />
        <Heading as='h2' size='4xl'>
          Solana Music.
        </Heading>
        <Text fontSize='lg'>
          Find some incredible music on Solana Blockchain. Upload your favorite
          music to show to the world what you are about.
        </Text>
        <Button
          colorScheme='blue'
          width='-webkit-fit-content'
          variant='solid'
          size='lg'
          rightIcon={<BiWallet />}
          mt='40px'>
          Connect your Wallet
        </Button>
      </Container>
      <HorizontalHeading>AcousticLicious</HorizontalHeading>
    </>
  );
}
