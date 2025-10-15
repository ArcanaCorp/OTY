import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function LayoutRoot () {

    return (

        <>
            <Outlet/>
            <Toaster position="top-center" richColors duration={3000} />
        </>

    )

}