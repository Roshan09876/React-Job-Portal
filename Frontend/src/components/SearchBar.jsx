import { Box, Button, InputBase } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router'
import * as yup from 'yup';

const validationSchema = yup.object({
    search: yup.string('Enter what you wnat to search').required('this field cannot be empty')
})

const SearchBar = () => {
    const navigate = useNavigate()

    const onSubmit = (values, actions) => {
        const { search } = values;
        if(search.trim()){
            navigate(`/search/${search}`)
        }else{
            navigate(`/`)
        }
        actions.resetForm()
    }

    const {values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting} = useFormik({
        initialValues: {
            search: ''
        },
        validationSchema: validationSchema,
        onSubmit
    })
    return (
        <>
            <form onSubmit={handleSubmit} style={{ width: '50%' }}>
                <Box sx={{ mt: '130px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <InputBase sx={{ bgcolor: 'white', padding: '10px' }}
                        fullWidth={true}
                        id='search'
                        name='search'
                        label='search'
                        placeholder='eg: FrontEnd'
                        value={values.search}
                        onChange={handleChange}
                        error={touched.search && Boolean(errors.search)}
                    />

                    <Button color='primary' variant='contained' type='submit'>
                        Search
                    </Button>
                </Box>
                <Box component='span' sx={{ color: 'orange' }}>{touched.search && errors.search}</Box>
            </form>
        </>
    )
}

export default SearchBar


