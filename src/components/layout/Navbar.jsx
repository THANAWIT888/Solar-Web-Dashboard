import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Avatar, ListItemIcon, Divider, Typography, Tooltip } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Padding } from "@mui/icons-material";


const HeaderBar = ({ user }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* search  */}
      <Box display="flex" borderRadius="3px" backgroundColor="#F5EFE7">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* icons */}

      <Box display="flex">
        <div className="left_setting">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        </div>
        <div className="profile-detail">
          <div style={{display:'flex',padding : '2px'}}>
          <div className="avatar" style={{marginRight : '15px'}}>
            <img src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg" alt="" />
          </div>
        <IconButton>
          <SettingsOutlinedIcon onClick={handleClick} />
          <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
    <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Welcome</div>
        <div style={{ marginLeft: '3px' }}>{user.firstname}</div>
    </div>
    <div style={{ fontSize: '14px', marginTop: '4px' }}>Role {user.role}</div>
</div>


        
        <Divider />
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
        </IconButton>
        </div>
        </div>
      </Box>
    </Box>
  );
};

export default HeaderBar;