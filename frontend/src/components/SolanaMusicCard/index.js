import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  IconButton,
  useToast
} from '@chakra-ui/react';
import he from 'he';
import { FaPlus, FaYoutube } from 'react-icons/fa';
import * as playlistApi from '../../services/playlist';
import { addSong } from '../../slices/playlistsSlice';

export default function SolanaMusicCard({ authenticated, music }) {
  const { videoId, title, thumbnailLink, channelTitle } = music;
  const data = {
    channelTitle: channelTitle,
    thumbnails: thumbnailLink,
    title: title,
    videoId: videoId,
  };

  const playlists = useSelector(state => {
    return Object.entries(state.playlists.playlists).map(
      ([_id, playlist]) => playlist
    );
  });
  const dispatch = useDispatch();
  const toast = useToast()

  const handleOnClickAdd = async playlist => {
    const res = await playlistApi.addSong(playlist.id, { song: data });

    if (res.status === 200) {
      dispatch(addSong({ song: res.data.song, playlistId: playlist.id }));
      toast({
        title: 'Music saved successfully!',
        description: `${title} has been successfully saved to your playlist ${playlist.name}.`,
        status: 'success',
        position: 'top',
        duration: 5000,
      });
    } else {
      // todo: unable to add song
    }
  };

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
          src={thumbnailLink}
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
          isDisabled={!authenticated ? true : false}
        />
        <MenuList>
          {playlists.length > 0 ? (
            playlists.map((playlist, index) => (
              <MenuItem
                key={index}
                onClick={async () => await handleOnClickAdd(playlist)}>
                {playlist.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem isDisabled>No playlists found.</MenuItem>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
}
