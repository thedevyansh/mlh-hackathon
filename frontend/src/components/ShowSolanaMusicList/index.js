import React, { useState, useEffect, useCallback } from 'react';
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
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { Buffer } from 'buffer';
import CreateSolanaAccount from '../CreateSolanaAccount';
import SolanaMusicCard from '../SolanaMusicCard';
import idl from '../../idl.json';
import kp from '../../keypair.json';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';

window.Buffer = Buffer;
const { SystemProgram } = web3;

// Get base account keypair
const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret)

const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
const opts = {
  preflightCommitment: 'processed',
};

export default function ShowSolanaMusicList({ walletAddress }) {
  const [inputValue, setInputValue] = useState('');
  const [musicList, setMusicList] = useState([]);

  const sendMusicToSolana = async () => {
    if (inputValue.length === 0) {
      console.log('No music link provided! Try again.');
      return;
    }
    setInputValue('');
    console.log('YouTube music link:', inputValue);

    // Call YT API to fetch title, thumbnail and channelTitle of music.

    // Call Solana function to add music details to blockchain along with
    // fetching the update music list

    // Dummy Data
    const musicDetails = {
      thumbnail: 'https://i.ytimg.com/vi/2Vv-BfVoq4g/default.jpg',
      title: 'Ed Sheeran - Perfect (Official Music Video)',
      channelTitle: 'Ed Sheeran',
    };

    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      await program.rpc.addMusic(
        musicDetails.thumbnail,
        musicDetails.title,
        musicDetails.channelTitle,
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
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      console.log('Got the account', account);
      setMusicList(account.musicList);
    } catch (error) {
      console.log('Error in [ getMusicListFromSolana ]: ', error);
      setMusicList(null);
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
      // Call Solana program here.
      getMusicListFromSolana();
    }
  }, [walletAddress, getMusicListFromSolana]);

  if (musicList === null) {
    return <CreateSolanaAccount createMusicAccount={createMusicAccount} />;
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
            <SolanaMusicCard key={idx} music={music} />
          ))}
        </SimpleGrid>
      </Container>
    );
  }
}
