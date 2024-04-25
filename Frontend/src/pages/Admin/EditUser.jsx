import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SideNav from '../../components/SideNav';
import { Box, Button, FormControl, FormGroup, Input, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { getUserApi, updateUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const EditUser = () => {
  //getting user id from url
  const { id } = useParams();

  //loading user data 
  useEffect(() => {
    getUserApi(id).then((res) => {
      console.log(res.data)
      setfirstName(res.data.user.firstName)
      setlastName(res.data.user.lastName)
      setemail(res.data.user.email)
      setpassword(res.data.user.password)
    })
  }, [id])

  //Making UseState
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('password', password)

    //Making API Calls

    updateUserApi(id, formData).then((res) => {
      if (res.data.success == false) {
        toast.error(res.data.message)
      } else {
        navigate('/admin/users')
        toast.success('User Edit Successfully')
      }
    }).catch((err) => {
      console.log(err)
      toast.error('Internal Server error')
    })
  }

  return (
    <>
      <Navbar />
      <SideNav />
      <Box sx={{ ml: 10, mr: 15, mt: 10 }} style={styles.formContainer}>
        <div>
          <h2>Edit User</h2>
          <FormGroup>
            <FormControl  style={styles.formControl}>
              <InputLabel >First Name</InputLabel>
              <Input value={firstName} onChange={(e) => setfirstName(e.target.value)}  style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Last Name</InputLabel>
              <Input value={lastName} onChange={(e) => setlastName(e.target.value)} style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Email</InputLabel>
              <Input value={email} onChange={(e) => setemail(e.target.value)} style={styles.inputField} />
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Password</InputLabel>
              <Input value={password} onChange={(e) => setpassword(e.target.value)} style={styles.inputField} type="password" />
            </FormControl>
            <Button onClick={handleSubmit} variant="contained" style={styles.button}>Update</Button>
          </FormGroup>
        </div>
      </Box>
    </>
  );
}

export default EditUser;

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
