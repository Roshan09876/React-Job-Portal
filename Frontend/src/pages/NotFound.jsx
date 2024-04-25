import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Box } from '@mui/material'

const NotFound = () => {
  return (
   <>
   <Navbar/>
   <Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh'
   }}>
    <h2>Page Not Found</h2>
   </Box>
   <Footer/>
   </>
  )
}

export default NotFound
