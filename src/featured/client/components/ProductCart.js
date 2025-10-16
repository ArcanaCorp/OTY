import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { useCart } from '../../context/CartContext';
import placeholder from '../../../shared/img/placeholder.jpg'
import './styles/productcart.css'
import { URL_API } from '../../../config/config';
export default function ProductCart ({ p }) {

    const { removeProduct, updateProduct } = useCart();
    
    const subtotal = p.amount * p.sell;

    const handleIncrement = () => updateProduct(p.id, Math.min(p.amount + 1, p.istock));
    const handleDecrement = () => updateProduct(p.id, Math.max(p.amount - 1, 0));

    return (

        <div className='__product_cart'>
            <button className='__btn_trash' onClick={() => removeProduct(p.id)}><IconTrash/></button>
            <div className='__product_img'>
                <img src={p.image ? `${URL_API}${p.image}` : placeholder} alt={`Foto del producto ${p.name} ${p.text}`} />
            </div>
            <div style={{width: '100%'}}>
                <h4>{p.name}</h4>
                <b>S/ {(subtotal).toFixed(2)}</b>
            </div>
            <div className='__row_change'>
                <div className='__change'>
                    <button className='__xbc' onClick={handleDecrement} disabled={p.amount === 0}><IconMinus/></button>
                    <div className='__xbc'>{p.amount}</div>
                    <button className='__xbc' onClick={handleIncrement} disabled={p.amount === p.istock}><IconPlus/></button>
                </div>
            </div>
        </div>

    )

}