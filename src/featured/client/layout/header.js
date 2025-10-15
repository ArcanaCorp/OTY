import { IconShare3, IconShoppingBag } from "@tabler/icons-react";
import './styles/header.css'
import { useCart } from "../../context/CartContext";

export default function Header () {

    const { cart } = useCart();

    return (

        <header className="__header">

            <div className='__box'>

                <h1>OTY</h1>

                <div className="__left">
                    <a href='/search' className="__btn">
                        <span className="__bad">{cart.length}</span>
                        <IconShoppingBag/>
                    </a>
                    <button className="__btn"><IconShare3/></button>
                </div>

            </div>

        </header>

    )

}