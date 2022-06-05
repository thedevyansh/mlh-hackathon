import React from 'react';
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
  Box,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

export default function ShowSolanaMusicList() {
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
            placeholder='Enter link to YouTube music for uploading...'
            _placeholder={{ color: 'white' }}
          />
          <InputRightElement width='5.5rem'>
            <Button colorScheme='blue' h='2rem' size='sm'>
              Upload
            </Button>
          </InputRightElement>
        </InputGroup>

        <SimpleGrid id='scrollable' columns={3} spacing={6} mt='60px'>
          <Box
            bg='rgba(12, 15, 49, 0.5)'
            border='1px solid #2A3448'
            transition='.2s all'
            _hover={{
              opacity: 0.8,
            }}
            borderRadius='8px'
            height='80px'></Box>
        </SimpleGrid>
      </Container>
    </>
  );
}
