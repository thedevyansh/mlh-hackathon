import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../slices/userSlice';
import {
  Box,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

function UserMenu({ isAuth, username }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isAuth) {
    return (
      <Box zIndex='3'>
        <MenuList>
          <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
            Logout
          </MenuItem>
        </MenuList>
      </Box>
    );
  }
  return null;
}

export default UserMenu;
