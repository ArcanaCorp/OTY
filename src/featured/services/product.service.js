import { URL_API } from "../../config/config";

export const getProducts = async () => {

    try {
        
        const response = await fetch(`${URL_API}/products`)
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || data.error || response.statusText);
        
            return data;

    } catch (error) {
        return { ok: false, error: error, message: 'SERVER_ERROR', code: 'SERVER_ERROR' }
    }

}

export const addNewProduct = async (newP) => {
    try {

        const formData = new FormData();

        formData.append('code', newP.code);
        formData.append('name', newP.name);
        formData.append('text', newP.text);
        formData.append('pcompra', newP.pcompra);
        formData.append('pventa', newP.pventa);
        formData.append('isSet', newP.isSet); // booleano
        formData.append('istock', newP.istock);
        formData.append('campaign', newP.campaign);
        formData.append('category', newP.category);
        formData.append('image', newP.image); 
        
        const response = await fetch(`${URL_API}/products/add`, {
            method: 'POST',
            body: formData
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || data.error || response.statusText);
        
            return data;

    } catch (error) {
        return { ok: false, error: error, message: 'SERVER_ERROR', code: 'SERVER_ERROR' }
    }
}