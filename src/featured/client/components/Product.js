import { useState } from 'react'
import { toast } from "sonner";
import { IconMinus, IconPlus } from '@tabler/icons-react'

import { useCart } from '../../context/CartContext'
import placeholder from '../../../shared/img/placeholder.jpg'

import './styles/product.css'
import { URL_API } from '../../../config/config';
export default function Product({ product }) {

    console.log(product);
    

    const { cart, addProduct, removeProduct } = useCart();

    const info = cart.find((c) => c.id === product.id || c.code === product.code);
    const [ amount, setAmount ] = useState(info?.amount || 0)

    const isInCart = cart.some((c) => c.id === product.id || c.code === product.code);
    const btnText = isInCart ? 'Agregado' : 'Agregar';

    const handleIncrement = () => setAmount((prev) => Math.min(prev + 1, product?.istock));
    const handleDecrement = () => setAmount((prev) => Math.max(prev - 1, 0));

    const handleAddToCart = () => {
        if (amount > 0) {
            addProduct(product, amount); // agregamos al carrito
            toast.success('Producto agregado')
        }
    };

    const handleRemoveCart = (id) => {
        removeProduct(id)
        toast.warning('Se eliminó del carrito')
    }

    return (

        <li className='__product'>
            <div className='__product_img'>
                <span className='__badge'>{product?.category}</span>
                <img src={product?.image ? `${URL_API}${product?.image}` : placeholder} alt={`Foto del producto ${product?.name} ${product?.text}`} />
            </div>
            <div className='__product_txt'>
                <h3 className='__name'>{product?.name}</h3>
                <p className='__txt'>{product?.text}</p>
                <div className='__flx'>
                    <p className='__price'>S/. {(product?.sell).toFixed(2)}</p>
                    <p className='__stock'>Stock: {product?.istock}</p>
                </div>
            </div>
            <div className='__product_act'>
                <div className='__change_amount'>
                    <button className='__cchm' onClick={handleDecrement} disabled={amount === 0}><IconMinus/></button>
                    <div className='__cchm'>{amount}</div>
                    <button className='__cchm' onClick={handleIncrement} disabled={amount === product?.istock}><IconPlus/></button>
                </div>
                <button className='__cchm_add' disabled={amount === 0} onClick={handleAddToCart}>{btnText}</button>
            </div>
            {isInCart && ( <button className='__btn_delete_product' onClick={() => handleRemoveCart(product?.id)}>Eliminar del carrito</button> )}
        </li>

    )

}