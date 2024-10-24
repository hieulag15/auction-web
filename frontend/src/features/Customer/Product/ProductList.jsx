import React, { useEffect, useState } from 'react';
import ProductCard from '~/components/Customer/ProductCard';
import { fetchProducts } from '~/features/Customer/Product/ProductListAPI';
import { Grid, Container, Pagination } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6); 

  useEffect(() => {
    fetchProducts().then(data => setProducts(data));
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} padding={2}>
        {paginatedProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(products.length / pageSize)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default ProductList;
