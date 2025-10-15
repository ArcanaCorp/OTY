import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext();
export const CartProvider = ({ children }) => {

    const [ cart, setCart ] = useState(() => {
        const storedCart = localStorage.getItem("cart_oty");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart_oty", JSON.stringify(cart));
    }, [cart]);

    const addProduct = (product, amount = 1) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === product.id || p.code === product.code);
            if (existing) {
                // Actualiza cantidad sin pasar el stock
                return prev.map((p) =>
                p.id === product.id || p.code === product.code
                    ? { ...p, amount: Math.min(p.amount + amount, product.istock) }
                    : p
                );
            }
            return [...prev, { ...product, amount: Math.min(amount, product.istock) }];
        });
    };

    // Actualizar cantidad de un producto
    const updateProduct = (productId, amount) => {
        setCart((prev) =>
            prev.map((p) =>
                p.id === productId ? { ...p, amount: Math.max(0, Math.min(amount, p.istock)) } : p
            )
        );
    };

    // Remover un producto
    const removeProduct = (productId) => {
        setCart((prev) => prev.filter((p) => p.id !== productId));
    };

    // Limpiar todo el carrito
    const clearCart = () => setCart([]);

    const contextValue = {
        cart,
        addProduct,
        updateProduct,
        removeProduct,
        clearCart
    }

    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext);