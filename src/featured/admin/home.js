import { IconBuildingStore, IconShoppingBagCheck } from "@tabler/icons-react";
import './styles/home.css'
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

export default function AdminHome () {

    const location = useLocation();

    return (

        <>
        
            <header className="__header_admin">
                <div className="__box">
                    <h1>Admin</h1>
                </div>
            </header>

            <main className="__main_admin">
                <Outlet/>
            </main>

            <footer className="__footer_admin">
                <ul className="__tabs">
                    <li>
                        <a className={`__tab ${location.pathname === '/admin' ? '__tab--active' : ''}`} href="/admin"><IconBuildingStore/> Productos</a>
                    </li>
                    <li>
                        <a className={`__tab ${location.pathname === '/admin/orders' ? '__tab--active' : ''}`} href="/admin/orders"><IconShoppingBagCheck/> Pedidos</a>
                    </li>
                </ul>
            </footer>

            <Toaster position="top-center" richColors duration={3000} />

        </>

    )

}