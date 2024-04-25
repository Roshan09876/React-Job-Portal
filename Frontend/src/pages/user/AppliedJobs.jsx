import React, { useEffect } from 'react';
import SideNav from '../../components/SideNav';
import Navbar from '../../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { userProfileAction } from '../../redux/actions/UserAction';
import CardElement from '../../components/CardElement';
import LoadingBox from '../../components/LoadingBox';

const AppliedJobs = () => {
  const { user } = useSelector(state => state.userProfile);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(userProfileAction());
  // }, []);

  return (
    <>
      <Navbar />
      <SideNav />
      <Box sx={{ maxWidth: "80%", margin: "auto", pt: 1 }}>
        <Typography variant="h4" sx={{ color: "black" }}> Jobs History</Typography>
        <Box>
          {user ? (
           user.jobsHistory && user.jobsHistory.length === 0  ? (
             <Typography variant='h4' sx={{textAlign: 'center', font: 'bold'}}>No Jobs History Found</Typography>
            ) : (
              user.jobsHistory.map((history, i) => (
                <CardElement
                  key={i}
                  id={history._id}
                  jobTitle={history.title}
                  description={history.description}
                  category=""
                  location={history.location}
                />
              ))
            )
          ) : (
            <LoadingBox /> 
          )}
        </Box>
      </Box>
    </>
  );
};

export default AppliedJobs;
