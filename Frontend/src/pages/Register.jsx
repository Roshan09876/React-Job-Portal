import React, { useState } from "react";
import backgroundImg from "../pages/images/back.jpeg";
import registerImg from "../pages/images/login.png";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Navbar from "../components/Navbar";
import { Avatar, Container, TextField, Typography, ThemeProvider, createTheme, Button, Stack } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { useFormik } from "formik";
import { registerApi } from "../apis/Api";
import { toast } from "react-toastify";

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
  firstName: yup
    .string('Enter your FirstName')
    .required('FirstName is required'),
  lastName: yup
    .string('Enter your LastName')
    .required('LastName is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    }
  });

   //strep-1 : Create a State Variable
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

  const changeFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const changeLastName = (e) => {
    setLastName(e.target.value)
  }
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  //After Ckucjubg tge submit button
  const handleSubmit = (e) => {
    e.preventDefault()

    //step : 1 check data in console
    console.log(firstName, lastName, email, password)

    //Creating JSON Data
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    //Send data to backend 
    registerApi(data).then((res) => {
      if (res.data.success === true) {
        toast.success(res.data.message)
        navigate('/login')
      } else {
        toast.error(res.data.message)
      }
    }).catch((err) => {
      console.log(err)
      toast.error('Please enter all fields')
    })

  }

  // const handleEmailChange = (e) =>{
  //   setEmail(e.target.value)
  //   formik.handleChange();

  // }

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
                  {/* <form onSubmit={handleSubmit}> */}
                  <Container>
                    <Box height={35} />
                    <Box sx={center}>
                      <Avatar sx={{
                        ml: "35px",
                        mb: "4px",
                        bgcolor: "#f5f5f5"
                      }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography variant="h4" component="h1">
                        Sign Up
                      </Typography>
                    </Box>
                    <Box height={80} />
                    <Grid container spacing={1}>
                      <Grid item xs={12} sx={{ ml: "1rem", mr: "1rem" }} >
                        <TextField
                          required
                          fullWidth
                          label="firstName"
                          name="firstName"
                          autoComplete="firstName"
                          onChange={changeFirstName}
                        />
                        <Box height={15} />
                        <TextField
                          required
                          fullWidth
                          label="lastName"
                          name="lastName"
                          autoComplete="lastName"
                          onChange={changeLastName}
                        />
                        <Box height={15} />
                        <TextField
                          required
                          fullWidth
                          label="email"
                          name="email"
                          autoComplete="email"
                          onChange={changeEmail}
                          // value={formik.values.email}
                          // onChange={handleEmailChange}
                          // onBlur={formik.handleBlur}
                          // error={formik.touched.email && Boolean(formik.errors.email)}
                          // helperText={formik.touched.email && formik.errors.email}

                        />
                        {/* {errors.email && touched.email ? (
                          <p className="form-error">{errors.email}</p>
                        ): null} */}
                        <Box height={15} />
                        <TextField
                          required
                          fullWidth
                          label="password"
                          type="password"
                          id="password"
                          name="password"
                          autoComplete="password"
                          // value={formik.values.password}
                          onChange={changePassword}
                        // onBlur={formik.handleBlur}
                        // error={formik.touched.password && Boolean(formik.errors.password)}
                        // helperText={formik.touched.password && formik.errors.password}
                        />

                      </Grid>
                    </Grid>
                  </Container>
                  <Box height={7} />
                  <Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
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
                      SignUp
                    </Button>
                    <Box height={10} />

                  </Grid>
                  <Grid item xs={12} sx={{
                    ml: "9rem",
                    mr: "1rem"
                  }}>
                    <Stack direction="row" spacing={1}>
                      <Typography>
                        Already have an account? {" "}
                        <span
                          style={{
                            color: "beb4fb",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigate('/login');
                          }}
                        >
                          Login
                        </span>
                      </Typography>
                    </Stack>
                  </Grid>
                  {/* </form> */}
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  )
}

export default Register;
