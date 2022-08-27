export const useFormatter = () => ({
    formatPrice: (price: number) => {
        return price.toLocaleString('pt', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'EUR'
        });
    }
})