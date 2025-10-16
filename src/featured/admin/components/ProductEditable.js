import { toast } from "sonner"
import './styles/producteditable.css'
export default function ProductEditable ({ p }) {

    const handleDelete = async () => {}

    const confirmDelete = () => {
        toast.warning('¿Estás seguro de eliminar este producto?', {
            action: {
                label: 'Sí, eliminar',
                onClick: () => handleDelete()
            },
            cancel: {
                label: 'Cancelar'
            },
            duration: 5000
        });
    };

    return (
        <li className="__card_prc_edt">
            <div className="__ccnj">
                <p className="__c">{p.code}</p>
                <h3 className="__n">{p.name}</h3>
                <p className="__t">{p.text}</p>
                <p className="__x">Cantidad: {p.istock} | Categoria: {p.category} | Precio: S/ {(p.sell).toFixed(2)}</p>
            </div>
            <div className="__ccnx">
                <a className="__ccnx_X __ccnx_X_E" href="/">Editar</a>
                <button className="__ccnx_X __ccnx_X_D" onClick={confirmDelete}>Eliminar</button>
            </div>
        </li>
    )
}