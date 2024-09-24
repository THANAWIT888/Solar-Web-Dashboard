import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from "@mui/material/CssBaseline";

const defaultTheme = createTheme();

export default function SignIn() {
  const [emailError, setEmailError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState(''); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate(); // ใช้งาน useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // ตรวจสอบรูปแบบอีเมล
    const email = data.get('email');
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    } else {
      setEmailError('');
    }

    const url = "http://100.94.171.111:8000/login";

    var MyHeaders = new Headers();
    MyHeaders.append("Content-Type", "application/json")
    
    const payload = {
      "email": data.get('email'),
      "password": data.get('password'),
      // "expiresIn": 10000
    };
    

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: MyHeaders,
        body: JSON.stringify(payload)
      });
    
      if (!response.ok) { // ตรวจสอบสถานะการตอบกลับ
        const errorData = await response.json(); // อ่าน response body
        console.log(errorData); // ล็อกข้อมูล response เพื่อดูว่ามีอะไรบ้าง
        setAlertSeverity('error');
        setAlertMessage(errorData.detail || 'Something went wrong'); // แสดงข้อความ error จาก response
        setOpenSnackbar(true);
        return;
      }
    
      const result = await response.json();
      setAlertSeverity('success');
      setAlertMessage('User Login successfully!');
      localStorage.setItem('token', result.access_token);
      
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    
    } catch (error) {
      console.error('Error:', error);
      setAlertSeverity('error');
      setAlertMessage('An unexpected error occurred.');
      setOpenSnackbar(true);
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!emailError} // แสดงข้อผิดพลาดถ้ามี
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                <Link href="/dashboard" variant="body2">
                  {"go dashboard"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Snackbar
          open={openSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          message={alertMessage}
          anchorOrigin={{
            vertical: 'top', // หรือ 'top'
            horizontal: 'right', // หรือ 'left'
          }}
          action={
            <Button color="inherit" onClick={handleCloseSnackbar}>
              Close
            </Button>
          }
        >
          <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
  
}  
