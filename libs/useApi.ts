export type getTenantResponse = {
    name: string;
    mainColor: string;
    secondColor: string;
}

export const useApi = () => ({

    getTenant: (tenantSlug: string): boolean | getTenantResponse => {

        switch (tenantSlug) {
            case 'vcburguer':

                return {
                    name: 'VCBurguer',
                    mainColor: '#FF0000',
                    secondColor: '#00FF00'
                }
                break;
            case 'vcpizza':

                return {
                    name: 'VCPizza',
                    mainColor: '#0000FF',
                    secondColor: '#FF0000'
                }
                break;
            default: return false;
        }

        
    }

});