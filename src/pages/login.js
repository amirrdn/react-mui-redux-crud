import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';

import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isLoading, setIsloading] = useState(null);
    const [errormsg, setErrormsg] = useState(null);
    const [progress, setProgress] = useState(0);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user !== null) {
            setTimeout(() => {
                setIsloading(false);
            }, 2000);
            localStorage.setItem('user', JSON.stringify(user));
            const dt = {
                users: JSON.parse(localStorage.getItem("user")),
            }
            props.clickMe(dt)
        }
    }, [user]);
    const loadProgress = () => {
        const intervalId = setInterval(() => {
            setProgress((t) => {
              if (t >= 100) clearInterval(intervalId);
              return (t < 100) ? t + 5 : t;
            });
            
          }, 100);
          return () => clearInterval(intervalId);

    }

    const LinearProgressWithLabel = (props) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
    }
    LinearProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate and buffer variants.
         * Value between 0 and 100.
         */
        value: PropTypes.number.isRequired,
      };
    useEffect(() => {
        if (!isLoading && isLoading !== null) {
            if (user) {
                const {
                    redirectTo
                } = queryString.parse(location.search);
                if(progress === 100){
                    navigate(redirectTo == null ? "/" : redirectTo)
                }
            }
        }
    }, [isLoading])
    const handleSubmit = async (event) => {
        event.preventDefault();
        const vdata = new FormData(event.currentTarget);
        setProgress(10);
        loadProgress();
        const data = {
            email: vdata.get('email'),
            password: vdata.get('password')
        }
        setIsloading(true);
        if (vdata.get('email') === 'admin@gmail.com' && vdata.get('password') === '123456') {
          setSuccess(true);
          setUser(data)
        }else{
          setProgress(0);
          setSuccess(false)
          setIsloading(false);
          setErrormsg('email or password not match');
        }
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} className='bg-abdi'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {
                progress === 0 || errormsg === '' ? <span className='color-abdi'>Login</span> : <span className='color-abdi'>Selamat Datang Kembali</span>
            }
          </Typography>
          {
            errormsg ?
              <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">{errormsg}</Alert>
            </Stack> : ''
          }
          {
            !success ?
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value='admin@gmail.com'
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value='123456'
                autoComplete="current-password"
                />
               
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className='bg-abdi'
                disabled={isLoading}
                >
                Sign In
                </Button>
                {/* <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid> */}
            </Box> :
            <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} className='bg-abdi'/>
            </Box>
          }
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} className='color-abdi'/>
      </Container>
    </ThemeProvider>
  );
}
