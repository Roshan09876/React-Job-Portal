import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import NotFound from './pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../src/theme';
import HomePage from './pages/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgot_Password from './pages/Forgot_Password';
import User_Dashboard from './pages/user/User_Dashboard';
import UserRoute from './protectedRouted/UserRoute';
import Profile from './pages/user/Profile';
import AppliedJobs from './pages/user/AppliedJobs';
import AdminRoutes from './protectedRouted/AdminRoutes';
import SingleJob from './pages/SingleJob';
import DashUsers from './pages/Admin/DashUsers';
import DashJobs from './pages/Admin/DashJobs';
import EditUser from './pages/Admin/EditUser';
import EditJobs from './pages/Admin/EditJobs';
import CreateJob from './pages/Admin/CreateJob';

//HOC (High Ordered Component)

function App() {
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>

        <CssBaseline />
        <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>

            {/*HomePage Route */}
            <Route path='/' element={<Homepage />} />
            <Route path='/search/location/:location' element={<HomePage />} />

            {/* Search Filter */}
            <Route path='/search/:keyword' element={<HomePage />} />

            {/*Register Route */}
            <Route path='/register' element={<Register />} />

            {/*Login Route */}
            <Route path='/login' exact element={<Login />} />

            {/*Login Route */}
            <Route path='/forgot-password' exact element={<Forgot_Password />} />

            {/* Admin Route */}
            <Route path='/admin' element={<AdminDashboard />} />

            {/*Not Found */}
            <Route path='*' element={<NotFound />} />

            {/* Protected Routes */}
            <Route path='/user/dashboard' element={<UserRoute><User_Dashboard/></UserRoute>} />
            <Route path='/user/profile' element={<UserRoute><Profile/></UserRoute>} />
            <Route path='/user/job' element={<UserRoute><AppliedJobs/></UserRoute>} />

            <Route path='/admin/dashboard' element={<AdminRoutes><AdminDashboard/></AdminRoutes>} />
            <Route path='/admin/users' element={<AdminRoutes><DashUsers/></AdminRoutes>} />
            <Route path='/admin/jobs' element={<AdminRoutes><DashJobs/></AdminRoutes>} />
            <Route path='/admin/edit/user/:id' element={<AdminRoutes><EditUser/></AdminRoutes>} />
            <Route path='/admin/edit/job/:id' element={<AdminRoutes><EditJobs/></AdminRoutes>} />
            <Route path='/admin/job/create' element={<AdminRoutes><CreateJob/></AdminRoutes>} />

            <Route path='/job/:id' element={<SingleJob/>}/>

          </Routes>
        </BrowserRouter>
      </ThemeProvider>

    </>
  );
}

export default App;
