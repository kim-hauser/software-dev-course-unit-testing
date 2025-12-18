const {calculateDiscount, filterProducts, sortInventory} = require('../product-inventory.js');

//1, positive
describe('calculateDiscount', () => {
test("applies a valid discount rate", () => {
    expect(calculateDiscount(100, 0.1)).toBe(90);
    });
});

//1 negative
describe('calculateDiscount', () => {
test("handles an invalid discount rate gracefully", () => {
    expect(calculateDiscount(100, -0.1)).toBe(null);
    });
});

//1 edge
describe('calculateDiscount', () => {
test("handles edge case with price of 0", () => {
    expect(calculateDiscount(0, 0.2)).toBe(0);
    });
});

describe('filterProducts', () => {

// 2. Positive test case: filter works correctly
  test('returns products that pass the callback condition', () => {
    const products = [
      { name: 'Apple', price: 1 },
      { name: 'Banana', price: 2 },
      { name: 'Cherry', price: 3 }
    ];
    const result = filterProducts(products, p => p.price > 1);
    expect(result).toEqual([
      { name: 'Banana', price: 2 },
      { name: 'Cherry', price: 3 }
    ]);
  });

// 2. Negative test case: invalid inputs
  test('returns empty array if products is not an array', () => {
    expect(filterProducts(null, p => p)).toEqual([]);
    expect(filterProducts('not an array', p => p)).toEqual([]);
  });

  test('returns empty array if callback is not a function', () => {
    const products = [{ name: 'Apple', price: 1 }];
    expect(filterProducts(products, null)).toEqual([]);
    expect(filterProducts(products, 'not a function')).toEqual([]);
  });

// 2. Edge test case: empty array or no products match
  test('returns empty array if no products match the callback', () => {
    const products = [
      { name: 'Apple', price: 1 },
      { name: 'Banana', price: 2 }
    ];
    const result = filterProducts(products, p => p.price > 5);
    expect(result).toEqual([]);
  });

  test('returns empty array if products array is empty', () => {
    const result = filterProducts([], p => p.price > 0);
    expect(result).toEqual([]);
  });

});

describe('sortInventory', () => {
    // Positive test: sorts by price correctly
    test('should sort inventory by numeric key "price" in ascending order', () => {
        const inventory = [
            { name: 'Shirt', price: 20 },
            { name: 'Pants', price: 40 },
            { name: 'Hat', price: 10 }
        ];
        const expected = [
            { name: 'Hat', price: 10 },
            { name: 'Shirt', price: 20 },
            { name: 'Pants', price: 40 }
        ];
        expect(sortInventory(inventory, 'price')).toEqual(expected);
    });

    // Negative test: invalid inputs
    test('should return empty array if inventory is not an array or key is not a string', () => {
        expect(sortInventory(null, 'price')).toEqual([]);
        expect(sortInventory({}, 'price')).toEqual([]);
        expect(sortInventory([{ name: 'Shirt' }], 123)).toEqual([]);
    });

    // Edge test: items missing the key
    test('should place items with undefined key at the end', () => {
        const inventory = [
            { name: 'Shirt', price: 20 },
            { name: 'Pants' }, // missing price
            { name: 'Hat', price: 10 }
        ];
        const expected = [
            { name: 'Hat', price: 10 },
            { name: 'Shirt', price: 20 },
            { name: 'Pants' } // undefined key goes last
        ];
        expect(sortInventory(inventory, 'price')).toEqual(expected);
    });
});

