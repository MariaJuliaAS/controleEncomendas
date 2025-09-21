import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Home } from "../pages/home";


const router = createBrowserRouter([
    {
        element: <Home />,
        path: "/"
    },
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