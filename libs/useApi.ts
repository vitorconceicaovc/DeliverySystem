import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";
import { User } from "../types/User";

const TEMPORARYoneProduct: Product = { 
    id: 1,
    image: '/tmp/burguer.png',
    categoryName: 'Traditional',
    name: 'Texas Burguer',
    price: 8.25,
    description: 'Two 150g beef blend, Cheddar Cheese, Caramelized Bacon, Salad, House Sauce, Homemade Brioche Bread.'
}

export const useApi = (tenantSlug: string) => ({

    getTenant: async () => {

        switch (tenantSlug) {
            case 'vcburguer':

                return {
                    slug: 'vcburguer',
                    name: 'VCBurguer',
                    mainColor: '#FB9400',
                    secondColor: '#FFF9F2'
                }
                break;
            case 'vcpizza':

                return {
                    slug: 'vcpizza',
                    name: 'VCPizza',
                    mainColor: '#6AB70A',
                    secondColor: '#E0E0E0'
                }
                break;
            default: return false;
        }

          
    },

    getAllProduct: async () => {
        let products = [];
        for(let q=0; q<10; q++) {
            products.push(TEMPORARYoneProduct)
        }
        return products;
    },

    getProduct: async (id: string) => {
        return TEMPORARYoneProduct;
    },

    authorizeToken: async (token: string): Promise<User | false> => {
        if(!token) return false;

        return {
            name: 'Vitor',
            email: 'vitor@gmail.com'
        }
    }

});