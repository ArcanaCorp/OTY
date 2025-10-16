import { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContext";
import ProductEditable from "../components/ProductEditable";
import NewProduct from "../components/NewProduct";

export default function Products () {

    const { products, getListProducts } = useProduct();
    const [ newProduct, setNewProduct ] = useState(false);

    const handleActiveForm = () => setNewProduct(!newProduct);

    useEffect(() => {
        if (!products || products.length === 0) {
            getListProducts();
        }
    }, [products, getListProducts]);

    if (!products) return <p>Cargando productos...</p>;

    return (

        <>
            {!newProduct ? (
                <button className="__btn_create" onClick={handleActiveForm}>Crear nuevo producto</button>
            ) : (
                <NewProduct onactive={handleActiveForm}/>
            )}

            <ul>
                {products.map((p) => (
                    <ProductEditable key={p.id} p={p} />
                ))}
            </ul>

        </>

    )

}