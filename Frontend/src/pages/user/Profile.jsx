import React from 'react'
import SideNav from '../../components/SideNav'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Box, CardContent } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const Profile = () => {
  const { user } = useSelector(state => state.userProfile);
    const { palette } = useTheme();
  return (
    
    <>
      <Navbar />
      <SideNav />
      <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
                <Card sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="#fafafa" gutterBottom>
                            Personal Info
                        </Typography>
                        <hr style={{ marginBottom: "30px" }} />
                        <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                            First name: {user && user.firstName}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                            Last name: {user && user.lastName}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                            E-mail:  {user && user.email}
                        </Typography>
                        <Typography sx={{ mb: 1.5, color: "grey", pt: 2 }} color="text.secondary">
                            Status: {user && user.role === 0 ? "Regular user" : "Admin"}
                        </Typography>

                    </CardContent>
                </Card>
            </Box>
    </>
  )
}

export default Profile
