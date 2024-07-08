import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";
// import SearchTag from "../pages/SearchTag";
import SearchContest from "../components/HomeComponets/SearchContest";
import AllContest from "../pages/AllContest";
import ContestDetais from "../pages/ContestDetais";
import PrivateRoute from './PrivateRoute';
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageUser from "../pages/Dashboard/Admin/ManageUser";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";
import ParticipatedContest from "../pages/Dashboard/UserDashboard/ParticipatedContest";
import Profile from "../pages/Dashboard/UserDashboard/Profile";
import WinningContest from "../pages/Dashboard/UserDashboard/WinningContest";
import AddContest from "../pages/Dashboard/CreatorDashboard/AddContest";
import ContestSubmittedPage from "../pages/Dashboard/CreatorDashboard/ContestSubmittedPage";
import MyCreatedContest from "../pages/Dashboard/CreatorDashboard/MyCreatedContest";
import AdminRoute from "./AdminRoute";
import UpdateContest from "../pages/Dashboard/CreatorDashboard/UpdateContest";
import CreatorRoute from "./CreatorRoute";
import Payment from "../pages/payment/Payment";
import WinnerSelected from "../pages/Dashboard/CreatorDashboard/WinnerSelected";
import Blog from "../pages/Blog";
import About from "../pages/About";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <Error></Error>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/blog',
            element: <Blog></Blog>
        },
        {
            path: '/about',
            element: <About></About>
        },
        {
            path: '/se',
            element: <SearchContest></SearchContest>
        },
        {
            path: '/allcontest',
            element: <AllContest></AllContest>
        },
        {
            path: '/details/:id',
            element: <PrivateRoute><ContestDetais></ContestDetais></PrivateRoute>,
            loader: ({params}) => fetch(`https://assignment12-server-site-nu.vercel.app/creator/${params.id}`)
        },
        {
          path: '/register',
          element: <Register></Register>
      },
      {
          path: '/login',
          element: <Login></Login>
      },
      {
          path: '/payment/:id',
          element: <Payment></Payment>,
          loader: ({params}) => fetch(`https://assignment12-server-site-nu.vercel.app/creator/${params.id}`)
      },

      {
          path: '/dashboard',
          element: <Dashboard></Dashboard>,
          children: [
            // user jonno
            {
              path: 'participated',
              element: <ParticipatedContest></ParticipatedContest>
            },
            
            {
              path: 'profile',
              element: <Profile></Profile>
            },
          
            {
              path: 'winning',
              element: <WinningContest></WinningContest>
            },


            // cratetor jonno
            {
              path: 'addcontest',
              element: <CreatorRoute> <AddContest></AddContest></CreatorRoute>
            },
            {
              path: 'createcontest',
              element: <CreatorRoute><MyCreatedContest></MyCreatedContest></CreatorRoute>,
            },
          
            {
              path: 'submitepage',
              element: <CreatorRoute><ContestSubmittedPage></ContestSubmittedPage></CreatorRoute>
            },
            {
              path: 'update/:id',
              element: <CreatorRoute><UpdateContest></UpdateContest></CreatorRoute>,
              loader: ({params}) => fetch(`https://assignment12-server-site-nu.vercel.app/creator/${params.id}`)
            },
            {
              path: 'winnerSeleced/:id',
              element: <CreatorRoute><WinnerSelected></WinnerSelected></CreatorRoute> ,
              loader: ({params}) => fetch(`https://assignment12-server-site-nu.vercel.app/creator/${params.id}`)
          },
            // admin jonno
            {
             path: 'manageuser',
             element: <AdminRoute><ManageUser></ManageUser></AdminRoute>,
            },
            {
             path: 'managcontest',
             element: <AdminRoute><ManageContests></ManageContests></AdminRoute>
            },
          ]
      },
      ]
    },
  ]);
  export default router;