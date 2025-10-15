import { IconShare3, IconShoppingBag } from "@tabler/icons-react";
import { useCart } from "../../context/CartContext";
import './styles/header.css'

export default function Header () {

    const { cart } = useCart();

    const handleShared = async () => {
        try {
            const shareData = {
                title: "Compartir",
                text: `Mira esta tienda tiene buenos descuentos para ofrecer.`,
                url: window.location.href,
            };

            // Guardar en BD que se compartió
            //await shareRegister({type,id: data?.sub});

            if (navigator.share) {
                // Si el dispositivo soporta la Web Share API (ej: móviles)
                await navigator.share(shareData);
            } else {
                // En Desktop: redirigir a WhatsApp Web
                const text = encodeURIComponent(`${shareData.text}: ${shareData.url}`);
                window.open(`https://wa.me/send?text=${text}`, "_blank");
            }
        } catch (err) {
            console.error("Error al compartir:", err);
        }
    }

    return (

        <header className="__header">

            <div className='__box'>

                <h1>OTY</h1>

                <div className="__left">
                    <a href='/cart' className="__btn">
                        <span className="__bad">{cart.length}</span>
                        <IconShoppingBag/>
                    </a>
                    <button className="__btn" onClick={handleShared}><IconShare3/></button>
                </div>

            </div>

        </header>

    )

}