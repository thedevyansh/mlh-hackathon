import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Flex,
  Text,
  IconButton,
  HStack,
  Tooltip,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { FaRegCopy, FaUsers } from 'react-icons/fa';
import { SocketContext } from '../../contexts/socket';
import { updateQueue } from '../../slices/queueSlice';
import QueueOrderModal from '../QueueOrderModal';
import Clock from 'react-live-clock';

export default function RoomInfo() {
  const { data } = useSelector(state => state.currentRoom);
  const { username } = useSelector(state => state.user);
  const authenticated = useSelector(state => state.user.authenticated);
  const { queue } = useSelector(state => state.queue);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('update_queue', payload => {
      dispatch(updateQueue(payload));
    });

    return () => {
      socket.removeAllListeners('update_queue');
    };
  }, [socket, dispatch]);

  const handleOpenQueueOrder = () => {
    onOpen();
  };

  const handleCopy = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      toast({
        title: 'Invite link copied to clipboard',
        status: 'info',
        duration: '2000',
        position: 'top',
      });

      return navigator.clipboard.writeText(window.location.href);
    }

    toast({
      title: 'Error copying invite link',
      status: 'error',
      duration: '2000',
      position: 'top',
    });
  };

  return (
    <>
      <Box bg='rgba(12, 22, 45, 0.5)' px={4}>
        <Flex h={8} alignItems='center' justifyContent='space-between'>
          <Text size='sm' color='gray.400' isTruncated>
            Hey, {username !== '' ? username : 'Guest'}. Welcome to {data.name}{' '}
            ✨
          </Text>
          <HStack spacing={4}>
            {authenticated && (
              <Tooltip hasArrow label='Friends in queue' placeContent='bottom'>
                <IconButton
                  onClick={handleOpenQueueOrder}
                  variant='ghost'
                  size='sm'
                  icon={<FaUsers />}
                />
              </Tooltip>
            )}
            <Tooltip hasArrow label='Copy invite link' placeContent='bottom'>
              <IconButton
                onClick={handleCopy}
                variant='ghost'
                size='sm'
                icon={<FaRegCopy />}
              />
            </Tooltip>
            <Clock format={'h:mm a'} ticking={true} />
          </HStack>
        </Flex>
      </Box>
      <QueueOrderModal
        isOpen={isOpen}
        onClose={onClose}
        username={username}
        queue={queue}
      />
    </>
  );
}
