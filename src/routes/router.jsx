import { createBrowserRouter } from 'react-router-dom'; 
import MainLayout from '../Layout/MainLayout';
import AuthLayout from './../Layout/AuthLayout';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import AddLostAndFound from '../Pages/AddLostAndFound';
import PrivateRoute from './PrivateRoute';

import AllItems from './../Pages/AllItems';
import PostDetails from '../Pages/PostDetails';
import ManageItem from '../Pages/ManageItem';
import UpdateItem from '../Pages/UpdateItem';
import RecoveredItem from '../Pages/RecoveredItem';
import ErrorPage from '../Pages/ErrorPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
    },
    {
        path: "auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/login",
                element: <Login></Login>,
            },
            {
                path: "/auth/register",
                element: <Register></Register>,
            },
        ],
    },
    {
        path: '/additems',
        element: <PrivateRoute><AddLostAndFound></AddLostAndFound></PrivateRoute>,
    },
  
    {
        path: '/allitems',
        element:<PrivateRoute> <AllItems></AllItems></PrivateRoute>
    },
    {
        path: '/items/:id',
        element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
       
    },
    {
        path:'/mangeitem',
        element:<PrivateRoute><ManageItem></ManageItem></PrivateRoute>,
       
    },
    {
        path:'/recovereditem',
        element:<PrivateRoute><RecoveredItem></RecoveredItem></PrivateRoute>,
       
    },
    {
        path:'/updateitem/:id',
        element:<PrivateRoute><UpdateItem></UpdateItem></PrivateRoute>,
       
    },
    {
        path:'*',
        element:<ErrorPage></ErrorPage>
    }
 
]);

export default router;
