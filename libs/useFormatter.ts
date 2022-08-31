export const useFormatter = () => ({
    formatPrice: (price: number) => {
        return price.toLocaleString('pt', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'EUR'
        });
    },
    formatQuantity: (qt: number, minDigits: number) => {

        if (qt.toString().length >= minDigits) {
            return qt.toString();
        }

        const remain = minDigits - qt.toString().length;
        return `${'0'.repeat(remain)}${qt}`;

    }
})