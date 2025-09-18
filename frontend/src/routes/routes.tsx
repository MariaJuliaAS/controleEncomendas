import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";


const router = createBrowserRouter([
    {
        element: <Login />,
        path: "/login"
    }
])

export { router }