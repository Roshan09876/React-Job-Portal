import { Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import { useSelector } from 'react-redux'
import moment from 'moment'
import Navbar from '../../components/Navbar'
import SideNav from '../../components/SideNav'
import StatComponent from '../../components/StatComponent';

const User_Dashboard = () => {
  const { user } = useSelector(state => state.userProfile);
  return (
    <>
      <Navbar />
      <SideNav />

      <Box sx={
        {ml: 15, mr: 10}
      } >
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Dashboard
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <StatComponent
            value={user && moment(user.createdAt).format('YYYY / MM / DD')}
            icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description={<Typography sx={{color: 'white'}}>Member since</Typography>}
            money=''
          />
          <StatComponent
            value={user && user.jobsHistory.length}
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description={<Typography sx={{color: 'white'}}>Number of jobs submitted</Typography>}
            money=''
          />
        </Stack>
      </Box>
    </>
  )
}

export default User_Dashboard
