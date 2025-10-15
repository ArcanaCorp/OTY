import { CartProvider } from "../featured/context/CartContext";
import { ProductProvider } from "../featured/context/ProductContext";

export default function Providers ({ children }) {

    return (
        <CartProvider>
            <ProductProvider>
                {children}
            </ProductProvider>
        </CartProvider>
    )

}