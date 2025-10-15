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