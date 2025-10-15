import { createContext, useContext, useMemo, useState } from "react";
import { getProducts } from "../services/product.service";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [ filter, setFilter ] = useState('all');
    const [ products, setProducts ] = useState([]);

    const handleChangeFilter = (f) => setFilter(f)

    const getListProducts = async () => {
        try {
            const data = await getProducts();
            if (data.ok) {
                setProducts(data.data)
            } else {
                setProducts([])
            }
        } catch (error) {
            console.error(error);
        }
    }

    const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
        return products.filter((p) => p.category === filter);
    }, [products, filter]);

    const contextValue = {
        products: filteredProducts,
        filter,
        getListProducts,
        handleChangeFilter
    }

    return (
        <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>
    )

}

export const useProduct = () => useContext(ProductContext);