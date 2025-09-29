import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Home } from "../pages/home";
import { PrivateRouter } from "./privateRoutes";


const router = createBrowserRouter([
    {
        element:
            <PrivateRouter>
                <Home />
            </PrivateRouter>
        ,
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