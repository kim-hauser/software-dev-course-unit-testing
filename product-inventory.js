

function calculateDiscount(price, discountRate) {
    if (typeof price !== 'number' || typeof discountRate !== 'number') return null;
    if (discountRate < 0 || discountRate > 1) return null;

    const discountAmount = price * discountRate;
    const finalPrice = price - discountAmount;

    return finalPrice;
}

function filterProducts(products, callback) {
    if (!Array.isArray(products) || typeof callback !== 'function') return [];
    const filtered = [];
    for (let i = 0; i < products.length; i++) {
        if (callback(products[i], i, products)) {
            filtered.push(products[i]);
        }
    }
    
    return filtered;
}

function sortInventory(inventory, key) {
    if (!Array.isArray(inventory) || typeof key !== 'string') return [];

    const sortedInventory = [...inventory];

    sortedInventory.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (valA === undefined) return 1;
        if (valB === undefined) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
            return valA - valB;
        }

        return String(valA).localeCompare(String(valB));
    });

    return sortedInventory;
}

module.exports = {
    calculateDiscount,
    filterProducts,
    sortInventory
};