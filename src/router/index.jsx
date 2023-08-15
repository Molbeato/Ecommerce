import { createBrowserRouter } from "react-router-dom";
import { homeLoader } from "./loaders/homeLoader";
import App from "../App";
import Login from "../pages/Login/Login";

import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";

import Home from "../pages/Home/Home";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Profile from "../pages/Profiles/Profile";

export const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/",
                loader: homeLoader,
                element: <Home/>
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                       <Profile/>
                    </ProtectedRoute>
                    ),
            },
            {
                path: "/product/:productId",
                element: <ProductDetail/>
            },
        ],
    },
    
    {
        path: "*",
        element: <p>Page not found 404</p>
    }
]);