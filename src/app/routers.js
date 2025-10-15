import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from "../featured/layout";
import Home from "../featured/client/home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutRoot/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/cart'
            }
        ]
    },
    {
        path: '/admin',
        element: <LayoutRoot/>,
        children: [
            {
                index: true,
            }
        ]
    }
])

export default router;