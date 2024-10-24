import React from 'react';
import ProductDetails from '~/features/Customer/Product/ProductDetail';
import CustomerLayout from '~/layouts/CustomerLayout';

const ProductDetailsPage = () => (
  <CustomerLayout>
    <h1>Product List</h1>
    <ProductDetails />
  </CustomerLayout>
);

export default ProductDetailsPage;
