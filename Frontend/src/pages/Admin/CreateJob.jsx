import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import SideNav from '../../components/SideNav';
import { Box, Button, FormControl, FormGroup, Input, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router';
import { createJobApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const CreateJob = () => {

  const[title, settitle] = useState('')
  const[description, setdescription] = useState('')
  const[salary, setsalary] = useState('')
  const[location, setlocation] = useState('')
  const[available, setavailable] = useState('')
  const[jobType, setjobType] = useState('')

  const navigate = useNavigate()

  const handleSubmit= (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('salary', salary)
    formData.append('location', location)
    formData.append('available', available)
    formData.append('jobType', jobType)

    createJobApi(formData).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message)
      } else {
        toast.success(res.data.message)
        navigate('/admin/jobs')
      }
    }).catch((err) => {
      console.log(err)
      toast.error('Internale Server Error')
    })
  }


  return (
    <>
    <Navbar/>
    <SideNav/>
    <Box sx={{ ml: 10, mr: 15, mt: 10 }} style={styles.formContainer}>
        <div>
          <h2>Create Job</h2>
          <FormGroup>
            <FormControl  style={styles.formControl}>
              <InputLabel >Job Name</InputLabel>
              <Input onChange={(e) =>settitle(e.target.value)} style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Description</InputLabel>
              <Input onChange={(e) =>setdescription(e.target.value)} style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Salary</InputLabel>
              <Input onChange={(e) =>setsalary(e.target.value)} style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>location</InputLabel>
              <Input onChange={(e) =>setlocation(e.target.value)} style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Available</InputLabel>
              <Input onChange={(e) =>setavailable(e.target.value)} style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>jobType</InputLabel>
              <Input onChange={(e) =>setjobType(e.target.value)} style={styles.inputField}/>
            </FormControl>
            <Button onClick={handleSubmit} variant="contained" style={styles.button}>Create Job</Button>
          </FormGroup>
        </div>
      </Box>
    </>
  )
}

export default CreateJob

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

