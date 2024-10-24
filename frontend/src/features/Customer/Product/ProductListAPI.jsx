const products = [
  { id: 1, status: '2 days', name: 'Product 1', slug: 'product-1', description: 'Description 1', price: '100', image: 'src/assets/images/defaultasset.png' },
  { id: 2, status: 'Available', name: 'Product 2', slug: 'product-2', description: 'Description 2', price: '20', image: 'src/assets/images/defaultasset.png' },
  { id: 3, status: 'Available', name: 'Product 3', slug: 'product-3', description: 'Description 3', price: '30', image: 'src/assets/images/defaultasset.png' },
  { id: 4, status: 'Available', name: 'Product 4', slug: 'product-4', description: 'Description 4', price: '40', image: 'src/assets/images/defaultasset.png' },
  { id: 5, status: 'Available', name: 'Product 5', slug: 'product-5', description: 'Description 5', price: '50', image: 'src/assets/images/defaultasset.png' },
  { id: 6, status: 'Available', name: 'Product 6', slug: 'product-6', description: 'Description 6', price: '60', image: 'src/assets/images/defaultasset.png' },
  { id: 7, status: 'Available', name: 'Product 7', slug: 'product-7', description: 'Description 7', price: '70', image: 'src/assets/images/defaultasset.png' },
  { id: 8, status: 'Available', name: 'Product 8', slug: 'product-8', description: 'Description 8', price: '80', image: 'src/assets/images/defaultasset.png' },
  { id: 9, status: 'Available', name: 'Product 9', slug: 'product-9', description: 'Description 9', price: '90', image: 'src/assets/images/defaultasset.png' },
  { id: 10, status: 'Available', name: 'Product 10', slug: 'product-10', description: 'Description 10', price: '100', image: 'src/assets/images/defaultasset.png' }
];

export const fetchProducts = async () => {
  return products;
};

export const fetchProductBySlug = async (slug) => {
  return products.find(product => product.slug === slug);
};
