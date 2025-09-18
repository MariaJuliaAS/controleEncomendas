import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";


const router = createBrowserRouter([
    {
        element: <Login />,
        path: "/login"
    },
    {
        element: <Register />,
        path: "/register"
    }
])

export { router }