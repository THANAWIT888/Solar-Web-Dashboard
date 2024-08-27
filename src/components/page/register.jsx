import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import '../css/registerFrom.css';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [emailError, setEmailError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState(''); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

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

    const url = "http://100.94.171.111:8000/register";
    
    const payload = {
      "firstname": data.get('firstName'),
      "lastname": data.get('lastName'),
      "password": data.get('password'),
      "email": data.get('email'),
      "role": 'user',
    };

    
    
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/9.2.0",
      // "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIiwidXNlcklkIjoiOWE1MTQzZjAtMmUxNi0xMWVmLWIzZjItZjMzM2RkNjRiZmYyIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiJmZThkMzc2MC1iNjAzLTRlODQtOTk1OC0yNDA2MTAxZjljMDEiLCJleHAiOjE3MjAxNTQ2MTAsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNzIwMTQ1NjEwLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiOTliYTViMjAtMmUxNi0xMWVmLWIzZjItZjMzM2RkNjRiZmYyIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.yCl3iFjWhLJT0KvUCq3ctRHMlEE16EzlHZRkQ1aDRUUwfSCrRVyeOy19U39BZaip7bkAwdvefnFuUt18_FM-ow"
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log(result);
      let statusCheck = result.status;
      
      if (statusCheck === "ok") {
        setAlertSeverity('success');
        setAlertMessage('User created successfully!');
        // setTimeout(() => {
        //     navigate('/homepage');
        //   }, 3000);
      } else if (statusCheck === "error") {
        setAlertSeverity('error');
        setAlertMessage('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertSeverity('error');
      setAlertMessage('Error: ' + error.message);
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" className='ContainerLoginForm'>
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type='email'
                autoComplete="email"
                error={!!emailError}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Remember User and Password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
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
  );
}
