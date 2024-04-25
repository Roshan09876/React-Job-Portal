import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import backgroundImg from "../pages/images/back.jpeg";
import { forgotPassword } from '../apis/Api';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const centerStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    const formStyle = {
        maxWidth: '400px',
        width: '100%',
    };

    const typographyStyle = {
        color: '#000000'
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        forgotPassword({email}).then(res => {
            toast.success('Please check your email for reset link')
        }).catch(err => {
            console.log(err)
            toast.error('Something went wrong')
        })
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
            <Box sx={centerStyle}>
                <form style={formStyle}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                           <Box textAlign='center'>
                           <Typography style={typographyStyle} variant='h4'>Forgot Password</Typography>
                           </Box>
                            <Box height={10}/>
                            <TextField
                                fullWidth
                                size="large"
                                required
                                name="email"
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                            onClick={handleSubmit}
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    mt: '10px',
                                    borderRadius: 15,
                                    color: '#ffffff',
                                    backgroundColor: '#3b33d5',
                                }}
                            >
                                Send Password Reset
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            </div>
        </>
    );
};

export default ForgotPassword;
