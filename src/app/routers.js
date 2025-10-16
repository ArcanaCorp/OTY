import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from "../featured/layout";
import Home from "../featured/client/home";
import Cart from "../featured/client/cart";
import AdminHome from "../featured/admin/home";
import Products from "../featured/admin/views/products";

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
                path: '/cart',
                element: <Cart/>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminHome/>,
        children: [
            {
                index: true,
                element: <Products/>,
            },
            {
                path: '/admin/orders',
                element: <h1>Orders</h1>
            }
        ]
    }
])

export default router;