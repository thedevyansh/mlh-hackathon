import React, { useState, useEffect } from 'react';
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
import SolanaMusicCard from '../SolanaMusicCard';

const YT_MUSIC = [
  {
    thumbnails: 'https://i.ytimg.com/vi/2Vv-BfVoq4g/default.jpg',
    title: 'Ed Sheeran - Perfect (Official Music Video)',
    channelTitle: 'Ed Sheeran',
  },
  {
    thumbnails: 'https://i.ytimg.com/vi/JGwWNGJdvx8/default.jpg ',
    title: 'Ed Sheeran - Shape of You (Official Music Video)',
    channelTitle: 'Ed Sheeran',
  },
  {
    thumbnails: 'https://i.ytimg.com/vi/QYO6AlxiRE4/default.jpg',
    title:
      '"Subhanallah" Full Video Song | Yeh Jawaani Hai Deewani | Pritam | Ranbir Kapoor, Deepika Padukone Ed Sheeran - Shape of You (Official Music Video)  Ed Sheeran - Shape of You (Official Music Video)',
    channelTitle: 'T-Series',
  },
];

export default function ShowSolanaMusicList({ walletAddress }) {
  const [inputValue, setInputValue] = useState('');
  const [musicList, setMusicList] = useState([]);

  const sendMusicToSolana = async () => {
    if (inputValue.length > 0) {
      console.log('YouTube music link:', inputValue);

      // Call Solana function to add music details to blockchain along with
      // fetching the update music list
      
      setInputValue('');
    } else {
      console.log('Empty input. Try again.');
    }
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      sendMusicToSolana();
    }
  };

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching Music list...');

      // Call Solana program here.

      // Set state
      setMusicList(YT_MUSIC);
    }
  }, [walletAddress]);

  return (
    <>
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
    </>
  );
}
