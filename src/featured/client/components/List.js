import { useMemo } from "react";
import { useProduct } from "../../context/ProductContext";
import Product from "./Product";

import './styles/list.css'

function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
        (res) => {
            status = "success";
            result = res;
        },
        (err) => {
            status = "error";
            result = err;
        }
    );
    return {
        read() {
            if (status === "pending") throw suspender;
            if (status === "error") throw result;
            return result;
        },
    };
}
export default function List () {

    const { products, getListProducts } = useProduct();

    // Solo creamos el recurso si no hay productos
    const productsResource = useMemo(() => {
        if (!products || products.length === 0) {
            return wrapPromise(getListProducts());
        }
        return { read: () => products };
    }, [products, getListProducts]);

    const loadedProducts = productsResource.read();

    return (

        <ul className="__grd_lst">
            {loadedProducts.map((p) => (
                <Product key={p.id} product={p}/>
            ))}
        </ul>

    )

}