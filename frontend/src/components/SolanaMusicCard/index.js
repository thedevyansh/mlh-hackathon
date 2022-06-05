import React from 'react';
import {
  Text,
  Icon,
  Flex,
  Image,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react';
import he from 'he';
import { FaPlus, FaYoutube } from 'react-icons/fa';

export default function SolanaMusicCard({ music }) {
  const { title, thumbnails, channelTitle } = music;
  return (
    <Flex
      bg='rgba(12, 15, 49, 0.6)'
      border='1px solid #2A3448'
      px={4}
      py={2}
      justify='space-between'
      alignItems='center'
      borderRadius='8px'
      transition='.2s all'
      _hover={{
        opacity: 0.8,
      }}>
      <Flex alignItems='center'>
        <Image
          src={thumbnails}
          w='110px'
          h='80px'
          fallbackSrc='https://via.placeholder.com/120x90'
          alt='thumbnail'
        />
        <Flex ml='4' flexDir='column'>
          <Text noOfLines={1}>{he.decode(title)}</Text>
          <HStack>
            <Icon as={FaYoutube} />
            <Text noOfLines={1}>{he.decode(channelTitle)}</Text>
          </HStack>
        </Flex>
      </Flex>
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          aria-label='Add to playlist'
          icon={<FaPlus />}
        />
        <MenuList>
          <MenuItem isDisabled>No playlists...</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
