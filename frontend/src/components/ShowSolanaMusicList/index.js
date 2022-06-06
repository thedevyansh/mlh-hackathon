import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Icon,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { Buffer } from 'buffer';
import CreateSolanaAccount from '../CreateSolanaAccount';
import SolanaMusicCard from '../SolanaMusicCard';
import LoadingView from '../LoadingView';
import * as songApi from '../../services/song';
import idl from '../../idl.json';
import kp from '../../keypair.json';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';

window.Buffer = Buffer;
const { SystemProgram } = web3;

// Get base account keypair
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
const opts = {
  preflightCommitment: 'processed',
};

export default function ShowSolanaMusicList({ walletAddress }) {
  const [inputValue, setInputValue] = useState('');
  const [musicList, setMusicList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authenticated = useSelector(state => state.user.authenticated);
  const toast = useToast();

  const sendMusicToSolana = async () => {
    if (inputValue.length === 0) {
      console.log('No music link provided! Try again.');
      return;
    }
    setInputValue('');
    console.log('YouTube music link:', inputValue);

    // Call YT API to fetch title, thumbnail and channelTitle of music.
    const response = await songApi.search(inputValue);
    const musicDetails = response?.data?.videos[0] ?? {};

    if (Object.keys(musicDetails).length !== 0) {
      const { videoId, thumbnails, title, channelTitle } = musicDetails;

      try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);

        await program.rpc.addMusic(
          videoId,
          thumbnails.default.url,
          title,
          channelTitle,
          {
            accounts: {
              baseAccount: baseAccount.publicKey,
              user: provider.wallet.publicKey,
            },
          }
        );
        console.log('Music successfully sent to Solana Program', inputValue);

        await getMusicListFromSolana();
      } catch (error) {
        console.log('Error sending music to Solana:', error);
      }
    } else {
      toast({
        title: 'Invalid query',
        description: 'Cannot find music to upload.',
        status: 'error',
        position: 'top',
        duration: 5000,
      });
    }
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      sendMusicToSolana();
    }
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const getMusicListFromSolana = useCallback(async () => {
    try {
      setIsLoading(true);
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      setMusicList(account.musicList);
      setIsLoading(false);
    } catch (error) {
      console.log('Error in [ getMusicListFromSolana ]: ', error);
      setMusicList(null);
      setIsLoading(false);
    }
  }, []);

  const createMusicAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log('ping');
      await program.rpc.initializeBaseAccount({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log(
        'Created a new BaseAccount w/ address:',
        baseAccount.publicKey.toString()
      );
      await getMusicListFromSolana();
    } catch (error) {
      console.log('Error creating BaseAccount account:', error);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching Music list from Solana...');
      getMusicListFromSolana();
    }
  }, [walletAddress, getMusicListFromSolana]);

  if (musicList === null) {
    return <CreateSolanaAccount createMusicAccount={createMusicAccount} />;
  } else if (isLoading) {
    return <LoadingView />;
  } else {
    return (
      <Container maxW='container.xl' p={8} overflow='auto'>
        <Text fontSize='2xl' mb='20px'>
          Upload or save music to your playlists.
        </Text>
        <InputGroup mb={4}>
          <InputLeftElement
            pointerEvents='none'
            children={<Icon as={FaSearch} color='#8F8F8F' />}
          />
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleEnter}
            placeholder='Enter link to YouTube music for uploading...'
            _placeholder={{ color: 'white' }}
          />
          <InputRightElement width='5.5rem'>
            <Button
              colorScheme='blue'
              disabled={inputValue.length > 0 ? false : true}
              h='2rem'
              size='sm'
              onClick={sendMusicToSolana}>
              Upload
            </Button>
          </InputRightElement>
        </InputGroup>

        <SimpleGrid id='scrollable' columns={2} spacing={4} mt='60px'>
          {musicList.map((music, idx) => (
            <SolanaMusicCard
              key={idx}
              authenticated={authenticated}
              music={music}
            />
          ))}
        </SimpleGrid>
      </Container>
    );
  }
}
