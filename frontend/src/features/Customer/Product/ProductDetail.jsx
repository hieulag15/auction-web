import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Chip, Grid, Rating, Stack, Button } from '@mui/material';
import { fetchProductBySlug } from '~/features/Customer/Product/ProductListAPI';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";


const ProductDetail = () => {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetchProductBySlug(productSlug);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [productSlug]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Chip
          variant="outlined"
          color="info"
          label={product?.brand}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={6}>
          <Box sx={{ flexGrow: 1 }}>
            <img
              src={product.images}
              alt="thumbnail"
              height="500"
              width="500"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h2" gutterBottom>
              {product?.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Rating
                value={product && product.rating}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box sx={{ ml: 2 }}>Customer Rating</Box>
            </Box>
            <Typography variant="body2" gutterBottom>
              {product?.description}
            </Typography>
            <Stack direction="row" sx={{ mt: 2 }}>
              <Typography variant="h3" gutterBottom>
                ${product?.price}
              </Typography>
              <Chip
                label={`${Math.round(product?.discountPercentage)}% OFF`}
                color="error"
                variant="outlined"
              />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={() => addToCart(product)}
              >
                Buy now
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Link
          to={`/store`}
        >
          {"back to store"}
        </Link>
      </Box>
    </Container>
  );
};

export default ProductDetail;
