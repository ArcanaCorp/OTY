import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
import { useCart } from "../context/CartContext";
import ProductCart from "./components/ProductCart";
import { addNewSale } from "../services/sales.service";
import { useProduct } from "../context/ProductContext";

import './styles/cart.css'

export default function Cart () {

    const navigate = useNavigate();
    const { getListProducts } = useProduct();
    const { cart, clearCart } = useCart();
    const [ delivery, setDelivery ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const subtotal = cart.reduce((acc, c) => acc + c.amount * c.sell, 0);
    const total = delivery ? subtotal + 2 : subtotal;

    const handleAddSale = async () => {
        try {

            setLoading(true);
            const data = await addNewSale(cart);
            if (!data.ok) return toast.warning(data.message)
                const saleCode = data.data; // Asegúrate que el backend devuelve el código aquí
                const message = `Hola vengo de su tienda 👋\nHe realizado un nuevo pedido con el código *${saleCode}*.\nPor favor, confirmar la recepción. ¡Gracias! 🙌`;
                window.open(`https://wa.me/51995984231?text=${encodeURIComponent(message)}`, '_blank');
                toast.success("Pedido enviado con éxito 🚀");

        } catch (error) {
            toast.error('Error: ' + error.message)
        } finally {
            setLoading(false);
            clearCart();
            getListProducts();
            navigate(-1)
        }
    }

    return (

        <>
        
            <header className="__header __header_cart">
                <div className="__box">
                    <button className="__btn_back" onClick={() => navigate(-1, { viewTransition: true })}><IconChevronLeft/></button>
                    <h4>Carrito de compras</h4>
                </div>
            </header>

            <main className="__main_cart">

                <ul className="__toogle" style={{display: 'none'}}>
                    <button className={!delivery ? 'active' : ''} onClick={() => setDelivery(!delivery)}>Recojo</button>
                    <button className={delivery ? 'active' : ''} onClick={() => setDelivery(!delivery)}>Delivery</button>
                </ul>

                {cart.map((c) => (
                    <ProductCart key={c.id} p={c} />
                ))}
                <section className="__summary">
                    <h3>Resumen</h3>
                    <ul>
                        {cart.map((c) => (
                            <li key={c.id}>
                                <p className="__fpx">{c.code}</p>
                                <p>S/ {(c.sell * c.amount).toFixed(2)}</p>
                            </li>
                        ))}
                        <li style={{borderTop: '1px dashed #888', borderBottom: '1px dashed #888'}}>
                            <p className="__fpx">Subtotal</p>
                            <p>S/ {(subtotal).toFixed(2)}</p>
                        </li>
                        {delivery && (
                            <li>
                                <p className="__fpx">Delivery</p>
                                <p>S/ {(2).toFixed(2)}</p>
                            </li>
                        )}
                        <li>
                            <p className="__fpx">Total</p>
                            <p>S/ {(total).toFixed(2)}</p>
                        </li>
                    </ul>
                </section>
            </main>

            <footer className="__footer_cart">
                <button onClick={handleAddSale} disabled={cart.length === 0}>{loading ? 'Realizando pedido...' : 'Continuar la compra'}</button>
            </footer>

        </>

    )

}