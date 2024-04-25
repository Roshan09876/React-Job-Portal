import React, { useEffect } from 'react'
import backgroundImg from "../pages/images/back.jpeg";
import registerImg from "../pages/images/login.png";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Navbar from "../components/Navbar";
import { Avatar, Container, TextField, Typography, ThemeProvider, createTheme, Button, Stack } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userSignInAction } from '../redux/actions/UserAction'
import { useFormik } from 'formik';


const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24
}

const center = {
  position: "absolute",
  top: "2%",
  left: "68%"
};

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.signIn);
  const userInfo = useSelector(state => state.signIn.userInfo);
  const userRole = userInfo ? userInfo.user.role : null;
  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 1) {
        navigate('/admin/dashboard');
      } else if (userRole === 0) {
        navigate('/user/dashboard');
      }
    }
  }, [isAuthenticated, navigate, userRole]);
  
    
  // }, [isAuthenticated, navigate])
  const formik = useFormik({
    initialValues: {
      email: 'khadkaroshan715@gmail.com',
      password: '11111111'
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      console.log(values);
      //  alert(JSON.stringify(values, null, 2));
      const { email, password } = formik.values;
      dispatch(userSignInAction({ email, password }));
      // dispatch(userSignInAction(values))
      actions.resetForm();
    }

  })

  const handleLoginClick = (values) => {
    formik.handleSubmit();
  }

  return (
    <>
      <div style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5"
      }}
      >
        <Navbar />
        <Box sx={boxStyle}>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={12} lg={6} >
              <Box style={{
                backgroundImage: `url(${registerImg})`,
                backgroundSize: "cover",
                marginTop: "40px",
                marginRight: "15px",
                height: "63vh",
                color: "#f5f5f5"
              }}>

              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6} >
              <Box style={{
                backgroundSize: "cover",
                height: "70vh",
                minHeight: "500px",
                backgroundColor: "#3b33d5"
              }}>
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={30} />
                    <Box sx={center}>
                      <Avatar sx={{
                        ml: "35px",
                        mb: "4px",
                        bgcolor: "#f5f5f5"
                      }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography variant="h4" component="h1">
                        Sign In
                      </Typography>
                    </Box>
                    <Box height={110} />
                    <Grid container spacing={1}>
                      <Grid item xs={12} sx={{ ml: "1rem", mr: "1rem" }} >
                        <form
                        >
                          <TextField
                            required
                            fullWidth
                            label="email"
                            name="email"
                            autoComplete="email"
                            // onChange={changeEmail}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                          />
                          <Box height={15} />
                          <TextField
                            required
                            fullWidth
                            label="password"
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="password"
                            // onChange={changePassword}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                          />
                        </form>
                      </Grid>
                    </Grid>
                  </Container>
                  <Box height={7} />
                  <Grid>
                    <Button
                      type="submit"
                      onClick={handleLoginClick}
                      variant="contained"
                      size="large"
                      sx={{
                        mt: "10px",
                        mr: "20px",
                        borderRadius: 15,
                        color: "#ffffff",
                        width: "70%",
                        backgroundColor: "#FF9A01",
                        mx: "auto",
                        display: "block"
                      }}
                    >
                      Login
                    </Button>
                    <Box height={10} />
                  </Grid>
                  <Grid item xs={12} sx={{
                    ml: "9rem",
                    mr: "1rem"
                  }}>
                    <Typography >
                      <span
                        style={{
                          color: "beb4fb",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate('/forgot-password');
                        }}
                      >
                        Forgot Password?
                      </span>
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Typography>
                        Don't have as account? {" "}
                        <span
                          style={{
                            color: "beb4fb",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigate('/register');
                          }}
                        >
                          SignUp
                        </span>
                      </Typography>
                    </Stack>
                  </Grid>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Footer />
    </>
  )
}

export default Login

