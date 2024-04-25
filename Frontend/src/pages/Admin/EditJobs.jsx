import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SideNav from '../../components/SideNav';
import { Box, Button, FormControl, FormGroup, Input, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { getJobsApi, getUserApi, updateJobApi, updateUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const EditJobs = () => {
    //getting user id from url
  const { id } = useParams();

  //loading job data 
  useEffect(()=> {
    getJobsApi(id).then((res)=> {
      console.log(res.data)
      settitle(res.data.job.title)
      setdescription(res.data.job.description)
      setsalary(res.data.job.salary)
      setlocation(res.data.job.location)
      setavailable(res.data.job.available)
      setcreatedAt(res.data.job.createdAt)
    })
  }, [id])

  //Making UseState
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [salary, setsalary] = useState('')
  const [location, setlocation] = useState('')
  const [available, setavailable] = useState('')
  const [createdAt, setcreatedAt] = useState('')

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('salary', salary)
    formData.append('location', location)
    formData.append('available', available)
    formData.append('createdAt', createdAt)

    //Making API call
    updateJobApi(id, formData).then((res)=> {
      if (res.data.success === false) {
        toast.err(res.data.message)
    } else {
        navigate('/admin/jobs')
        toast.success(res.data.message)
    }
    }).catch((err) => {
      console.log(err)
      toast.error('Internal Server Error')
  })
  }

  return (
    <>
          <Navbar />
      <SideNav />
      <Box sx={{ ml: 10, mr: 15, mt: 10 }} style={styles.formContainer}>
        <div>
          <h2>Edit Job</h2>
          <FormGroup>
            <FormControl  style={styles.formControl}>
              <InputLabel >Job Name</InputLabel>
              <Input value={title} onChange={(e) => settitle(e.target.value)} style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Description</InputLabel>
              <Input value={description} onChange={(e) => setdescription(e.target.value)} style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Salary</InputLabel>
              <Input value={salary} onChange={(e) => setsalary(e.target.value)} style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Location</InputLabel>
              <Input value={location} onChange={(e) => setlocation(e.target.value)} style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Job Created At</InputLabel>
              <Input value={createdAt} onChange={(e) => setcreatedAt(e.target.value)} style={styles.inputField} type="password" />
            </FormControl>
            <Button onClick={handleSubmit} variant='contained' >Update</Button>
          </FormGroup>
        </div>
      </Box>
    </>
  )
}

export default EditJobs


const styles = {
    formContainer: {
      width: '70%',
      margin: 'auto',
      padding: 20,
      border: '1px solid #ccc',
      borderRadius: 5,
      boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)'
    },
    formControl: {
      marginBottom: 15
    },
    inputField: {
      width: '100%',
      padding: 10,
      fontSize: 16,
      border: '1px solid #ccc',
      borderRadius: 5
    },
  };