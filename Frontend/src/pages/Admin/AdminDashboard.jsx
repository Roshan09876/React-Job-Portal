import React from 'react'
import Navbar from '../../components/Navbar'
import { Box, Stack, Typography } from '@mui/material';
import SideNav from '../../components/SideNav'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import StatComponent from '../../components/StatComponent';
import ChartComponent from '../../components/ChartComponent';
import { Chart } from "react-google-charts";
import {data, options} from './data/Data'

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <SideNav />
      <Box sx={
        { ml: 15, mr: 10 }
      }>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Dashboard
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >

          <StatComponent
            value="45621"
            icon={<SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description={<Typography sx={{ color: 'white' }}>Administrators</Typography>}
            money=''
          />
          <StatComponent
            value="450"
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description={<Typography sx={{ color: 'white' }}>Jobs</Typography>}
            money=''
          />
          <StatComponent
            value="6548"
            icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description={<Typography sx={{ color: 'white' }}>Jobs Categories</Typography>}
            money=''
          />

        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3 }}
          spacing={{ xs: 1, sm: 2, md: 4 }}>
          <ChartComponent>
            <Chart
              chartType="Bar"
              data={data}
              options={options}
              width="100%"
              height="300px"
              legendToggle
            />
          </ChartComponent>
        </Stack>

      </Box>

    </>
  )
}

export default AdminDashboard
