import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <CardMedia
      component="img"
      height="140"
      width="100" 
      image={product.image} 
      alt={product.name}
      style={{ objectFit: 'contain' }} 
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5">
        {product.status}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {product.description}
      </Typography>
      <Typography variant="h4" align="left">
        ${product.price}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'space-between',ml: 1 }}>
      <Button 
        size="small" 
        color="secondary"
        sx={{ 
          backgroundColor: '#b41712', 
          color: 'white',
          '&:hover': {
            backgroundColor: 'darkred'
          },
          
        }}
        component={Link}
        to={`/${product.slug}`}
      >
        Details
      </Button>
      <Button size="small" color="primary">
        Thêm vào giỏ
      </Button>
    </CardActions>
  </Card>
);

export default ProductCard;
