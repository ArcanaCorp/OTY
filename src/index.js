import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./app/routers";

import './shared/css/global.css'
import Providers from "./app/providers";

createRoot(document.getElementById('root')).render (
    <>
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    </>
)