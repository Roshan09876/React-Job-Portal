import axios from "axios";
import login_mock from "../mock/login_mock";
import job_mock from "../mock/job_type_mock";
import register_mock from "../mock/register_mock";
import create_job_mock from "../mock/create_job_mock";
import create_job_type_mock from "../mock/create_job_type_mock";
import bookmark_mock from "../mock/bookmark_mock";
import getBookmark_mock from "../mock/get_bookmark_mock";
import user_history_mock from "../mock/user_history_mock";
const backendURL = 'http://localhost:5500'

describe('App Testing', () => {
  //testing /test endpoint 
  it('GET /test | Test should work', async () => {
    const response = await axios.get(`${backendURL}/test`)
    expect(response.status).toBe(200)
  })

  //Register test
  it('POST /api/signup | Register Successfull', async () => {
    const response = await axios.post(`${backendURL}/api/signin`, register_mock)
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true)
  })

  //Login Test 
  it('POST /api/signin | Login Successfull', async () => {
    const response = await axios.post(`${backendURL}/api/signin`, login_mock)
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true)
    expect(response.data.token).toBeDefined();
  }, 10000)


  //Get all Job Types, Each Job name should match to each actual job name 
  it('GET /api/type/jobs | Should Work', async () => {
    const response = await axios.get(`${backendURL}/api/type/jobs`)
    expect(response.status).toBe(200)
    expect(response.data.job).toBeDefined()

    //Match each jobtype  name 
    response.data.job.forEach((individualJob, index) => {
      const cat = console.log(individualJob.jobTypeName)
      //Job 1 match to mock ko index 0 ko name sanga 
      expect(cat).toBe(job_mock[individualJob.jobTypeName])
    })
  })

  //Create Job
  it('POST /api/job/create | Should Work', async () => {
    const response = await axios.post(`${backendURL}/api/job/create`, create_job_mock);
    console.log(response)
    console.log(response.status)
  })

  //Create Job Type
  it('POST /api/type/create | Should Work', async () => {
    const response = await axios.post(`${backendURL}/api/job/create`, create_job_type_mock);
    console.log(response)
    console.log(response.status)
  })

  //Get BookMark
  it('GET /api/book/${id} | Should Work', async () => {
    const id = '65db0a22669f21cf58217aa9';
    const response = await axios.get(`${backendURL}/api/book/${id}`, getBookmark_mock)
    console.log(response)
    expect(response.status).toBe(200);
  })

  //Create Bookmarks
  it('POST /api/book | Should Work', async () => {
    const response = await axios.post(`${backendURL}/api/book`, bookmark_mock);
    console.log(response)
  })

  //User History
  it('GET /api/user/jobhistory/${id} | Should Work', async () => {
    const id = '65e429d20a470ebcb18dd786';
    const response = await axios.get(`${backendURL}/api/user/jobhistory/${id}`, user_history_mock)
    console.log(response)
    expect(response.status).toBe(200);
  })

  //Get all Jobs, Each Job name should match to each actual job name 
  it('GET /api/jobs/show | Should Work', async () => {
    const response = await axios.get(`${backendURL}/api/jobs/show`)
    console.log(response)
  })

})
