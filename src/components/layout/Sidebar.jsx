import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import AddHomeIcon from '@mui/icons-material/AddHome';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import TopicIcon from '@mui/icons-material/Topic';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PaymentsIcon from '@mui/icons-material/Payments';

const SideBar = ({ isSidebar, user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      window.startX = touch.clientX;
    };

    const handleTouchEnd = (e) => {
      const touch = e.changedTouches[0];
      const endX = touch.clientX;

      if (window.startX < endX && Math.abs(window.startX - endX) > 50) {
        setToggled(true);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleNavigation = (path, user) => {
    navigate(path, { state: { user } });
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        style={{ height: "100%" }}
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{ margin: "10px 0 20px 0" }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <Typography>SOLAR APP</Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              <MenuItem icon={<HomeOutlinedIcon />} onClick={() => handleNavigation('/dashboard/overview', user)}>
                Dashboard
              </MenuItem>
              
              <SubMenu icon={<MapOutlinedIcon />} onClick={() => handleNavigation('/dashboard/plant', {user})} label="Plant">
                <MenuItem icon={<AddHomeIcon />} onClick={() => handleNavigation('/dashboard/parameter', {user})} label="Plant">
                Parameter
                </MenuItem>
                <MenuItem icon={<ContactPageIcon />} onClick={() => handleNavigation('/dashboard/contract' , user)} >Contact</MenuItem>
                <SubMenu label="Billing" icon={<PaymentsIcon />}>
                <MenuItem >
                View Billing
                </MenuItem>
                <MenuItem>Adjust Billing</MenuItem>
                <MenuItem>Manual Add Billing</MenuItem>
              </SubMenu>

              <SubMenu label="Data" icon={<TopicIcon />}>
                <MenuItem >
                View Data
                </MenuItem>
                <MenuItem >
                View Gain
                </MenuItem>
              </SubMenu>

              </SubMenu>

              <SubMenu label="Manage" icon={<PeopleOutlinedIcon />}>
                <MenuItem onClick={() => handleNavigation('/admin/manage', user)}>
                  User
                </MenuItem>
                <MenuItem>Admin</MenuItem>
              </SubMenu>

              <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
              <MenuItem icon={<ReceiptOutlinedIcon />}>Documentation</MenuItem>
            </Menu>
          </div>

          <div style={{ display: "flex", flexDirection: "column", height: "8%" }}>
            {/* <div>eee{user.firstname}</div> */}
            <Menu style={{backgroundColor : '#F3EBEB' , margin : ' 6px'  , borderRadius : ' 5px'}}>
              <MenuItem icon={<LogoutIcon />} onClick={() => handleNavigation('/', user) }>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default SideBar;
