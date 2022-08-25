import { Tenant } from "../types/Tenant";

export const useApi = () => ({

    getTenant: (tenantSlug: string): boolean | Tenant => {

        switch (tenantSlug) {
            case 'vcburguer':

                return {
                    slug: 'vcburguer',
                    name: 'VCBurguer',
                    mainColor: '#FF0000',
                    secondColor: '#00FF00'
                }
                break;
            case 'vcpizza':

                return {
                    slug: 'vcpizza',
                    name: 'VCPizza',
                    mainColor: '#0000FF',
                    secondColor: '#FF0000'
                }
                break;
            default: return false;
        }

        
    }

});