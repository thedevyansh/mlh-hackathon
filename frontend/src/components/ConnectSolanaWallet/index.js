import React from 'react';
import {
  Container,
  Heading,
  Text,
  Button,
  Image,
  useToast,
} from '@chakra-ui/react';
import { HorizontalHeading } from '../../horizontalHeading';
import { BiWallet } from 'react-icons/bi';
import solanaLogo from './solanaLogo.png';

export default function ConnectSolanaWallet({ setWalletAddress }) {
  const toast = useToast();

  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
      } else {
        toast({
          title: 'Phantom wallet not found.',
          description: 'Please install the wallet from https://phantom.app.',
          status: 'error',
          position: 'top',
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: 'An error occured!',
        description: error.message,
        status: 'error',
        position: 'top',
        duration: 5000,
      });
    }
  };

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
          mt='40px'
          onClick={connectWallet}>
          Connect your Wallet
        </Button>
      </Container>
      <HorizontalHeading>AcousticLicious</HorizontalHeading>
    </>
  );
}
