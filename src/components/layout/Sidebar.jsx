import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
import LogoutIcon from '@mui/icons-material/Logout';

const SideBar = ({ isSidebar }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        style={{ height: "100%" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                }}
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

              <MenuItem icon={<HomeOutlinedIcon />} onClick={() => handleNavigation('/dashboard/overview')}>
                Dashboard
              </MenuItem>

              <SubMenu icon={<MapOutlinedIcon />} label="Data">
                <MenuItem icon={<TableViewIcon />} onClick={() => handleNavigation('/dashboard/plant')}>
                  Plant
                </MenuItem>
                <MenuItem icon={<BarChartOutlinedIcon />}>Line charts</MenuItem>
              </SubMenu>

              <SubMenu label="Manage" icon={<PeopleOutlinedIcon />}>
                <MenuItem onClick={() => handleNavigation('/admin/manage')}>
                  User
                </MenuItem>
                <MenuItem>Admin</MenuItem>
              </SubMenu>

              {/* Additional Menu Items */}
              <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
              <MenuItem icon={<ReceiptOutlinedIcon />}>Documentation</MenuItem>
            </Menu>
          </div>

          <div style={{ display: "flex", flexDirection: "column", height: "8%" }}>
            <Menu>
              <MenuItem icon={<LogoutIcon />} onClick={() => handleNavigation('/')}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SideBar;
