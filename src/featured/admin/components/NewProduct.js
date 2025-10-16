import { useState } from "react";
import { toast } from 'sonner'
import { IconPhoto } from "@tabler/icons-react";
import { filterList } from "../../../config/config";

import './styles/newproduct.css'
import { addNewProduct } from "../../services/product.service";

export default function NewProduct ({ onactive }) {

    const [ previewImage, setPreviewImage ] = useState('')
    const [ newP, setNewP ] = useState({
        image: '',
        code: '',
        name: '',
        text: '',
        pcompra: '',
        pventa: '',
        isSet: null,
        istock: '',
        campaign: '',
        category: ''
    })
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewP(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        const img = new Image();

        reader.onload = function (event) {
            img.onload = function () {
                const aspectRatio = 16 / 4;

                let cropWidth = img.width;
                let cropHeight = img.width / aspectRatio;

                if (cropHeight > img.height) {
                    cropHeight = img.height;
                    cropWidth = img.height * aspectRatio;
                }

                const cropX = (img.width - cropWidth) / 2;
                const cropY = (img.height - cropHeight) / 2;

                const canvas = document.createElement('canvas');
                canvas.width = cropWidth;
                canvas.height = cropHeight;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(
                    img,
                    cropX,
                    cropY,
                    cropWidth,
                    cropHeight,
                    0,
                    0,
                    cropWidth,
                    cropHeight
                );

                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

                setPreviewImage(dataUrl);
                setNewP(prev => ({
                    ...prev,
                    image: dataURLtoFile(dataUrl, file.name)
                }));
            };

            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    };

    // Utilidad para convertir base64 a archivo real
    function dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    const handleSetType = (value) => {
        setNewP(prev => ({ ...prev, isSet: value }));
    };

    const handleCancel = () => {
        // Opcional: reset form
        setNewP({
            image: '',
            code: '',
            name: '',
            text: '',
            pcompra: '',
            pventa: '',
            isSet: null,
            istock: '',
            amount: '',
            category: ''
        });
        setPreviewImage('');
        onactive();
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const data = await addNewProduct(newP);
            if (!data.ok) return toast.warning(data.message)
                console.log(data);
                
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
            handleCancel()
        }
    }

    return (

        <div className="__form_create_product">
            <div className="__form_control">
                <label htmlFor="photo" className="__label_img">
                    {previewImage ? (
                        <img src={previewImage} alt="Preview" className="__preview_img" />
                    ):(
                        <IconPhoto/>
                    )}
                </label>
                <input type="file" id="photo" name="photo" style={{display: 'none'}} accept="image/*" capture="environment" onChange={handleImageChange}/>
            </div>
            <div className="__form_control">
                <input className="__entry" placeholder="Código" id="code" name="code" value={newP.code} onChange={handleChange} />
            </div>
            <div className="__form_control">
                <input className="__entry" placeholder="Nombre" id="name" name="name" value={newP.name} onChange={handleChange}  />
            </div>
            <div className="__form_control">
                <input className="__entry" placeholder="Descripción" id="text" name="text" value={newP.text} onChange={handleChange}  />
            </div>
            <div className="__form_control">
                <select className="__select" placeholder="Ingresa la categoria del producto" id="category" name="category" value={newP.category} onChange={handleChange} >
                    <option selected hidden>Categoria</option>
                    {filterList.map((fx, idx) => (
                        <option key={idx} value={fx}>{fx}</option>
                    ))}
                </select>
            </div>
            <div className="__form_control flex">
                <button className={`__entry ${newP.isSet && '__entry--active'}`} onClick={() => handleSetType(true)}>En grupo</button>
                <button className={`__entry ${!newP.isSet && '__entry--active'}`} onClick={() => handleSetType(false)}>Unidad</button>
            </div>
            <div className="__form_control flex">
                <input className="__entry" placeholder="Precio de compra" id="pcompra" name="pcompra" value={newP.pcompra} onChange={handleChange}  />
                <input className="__entry" placeholder="Precio de venta" id="pventa" name="pventa" value={newP.pventa} onChange={handleChange}  />
            </div>
            <div className="__form_control flex">
                <input className="__entry" placeholder="Stock del producto" id="istock" name="istock" value={newP.istock} onChange={handleChange} />
            </div>
            <div className="__form_control flex">
                <select className="__select" name="campaign" id="campaign" value={newP.campaign} onChange={handleChange}>
                    <option selected hidden value={''}>Campaña del producto</option>
                    <option value={'Navidad'}>Navidad</option>
                </select>
            </div>
            <div className="__form_control flex">
                <button onClick={handleCancel}>Cancelar</button>
                <button className="__active" disabled={loading} onClick={handleSubmit}>{loading ? 'Creando...' : 'Crear'}</button>
            </div>
        </div>

    )

}