import { URL_API } from "../../config/config";

export const addNewSale = async (cart) => {
    try {
    
        let userLocal = localStorage.getItem('user_oty');
        if (!userLocal) {
            const randomUserId = Math.floor(Math.random() * 1e13).toString().padStart(13, '0');
            localStorage.setItem('user_oty', randomUserId);
            userLocal = randomUserId;
        }
    
        const response = await fetch(`${URL_API}/sales/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: userLocal, products: cart})
        })
    
        const data = await response.json();
    
        if (!response.ok) throw new Error(data.message || data.error || response.statusText);
        
            return data;
    
    } catch (error) {
        console.error(error);
    }
}