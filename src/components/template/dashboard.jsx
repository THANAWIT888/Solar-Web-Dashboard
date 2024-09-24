import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route ,Outlet} from 'react-router-dom';
import HeaderBar from "../layout/Navbar";
import SideBar from "../layout/Sidebar";
import Overview from "../page/Overview";
import Plant from '../page/plant';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from '../page/Login';


function Dashboard() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [user, setUser] = useState({
    avatar: "",
    firstname: "",
    lastname: "",
    role: ""
  });
  const users = { firstname: 'John' };

  const navigate = useNavigate();

  // Function to show multiple Toast notifications
  const showMultipleNotifications = (count) => {
    for (let i = 0; i < count; i++) {
      toast.error("Token expired or invalid");
    }
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (!token) {
  //         toast.error("No token found");
  //         navigate('/');
  //         return;
  //       }
  
  //       const response = await fetch("http://100.94.171.111:8000/users/me", {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });
  
  //       if (response.status === 401) {
  //         localStorage.removeItem('token'); // Remove token if expired
  //         showMultipleNotifications(3);
  //         navigate('/');
  //         return;
  //       }
  
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  
  //       const result = await response.json();
  //       // console.log(result);
  
  //       if (result && result.email) {
  //         setUser({
  //           id: result.id || "",  // เพิ่มการจัดการ id
  //           avatar: result.avatar || "",
  //           firstname: result.firstname || "",
  //           lastname: result.lastname || "",
  //           role: result.role || ""
  //         });
  //       // console.log(user)
          
  //       } else {
  //         toast.error("Failed to fetch user data");
  //       }
  //     } catch (error) {
  //       toast.error("Error: " + error.message);
  //     }
  //   };
  
  //   fetchUserData();
  // }, [navigate]);

  return (
    <>
      <CssBaseline />
      <div className="app">
        <SideBar isSidebar={isSidebar} user={user} />
        <main className="content">
          <div className="navbar">
            <HeaderBar setIsSidebar={setIsSidebar} user={user} />
          </div>
          <div className="content_body" style={{ marginTop: '20px !important' }}>
            <Box m="20px" >
              
              <Outlet context={{ user }} />
              
            </Box>
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default Dashboard;
