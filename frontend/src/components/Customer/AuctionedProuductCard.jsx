import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const AuctionedProductCard = ({ product, cardWidth, isFirst, isLast }) => {
  return (
    <Card
      sx={{
        width: cardWidth,
        m: 2,
        ml: isFirst ? 0 : 2,
        mr: isLast ? 0 : 2,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ height: 150 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Starting bid: {product.startingBid} USD
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Auction Date: {product.auctionDate}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: '#b41712',color: "white",'&:hover': { backgroundColor: '#a31610' } }}
        >
          Details
        </Button>
      </Box>
    </Card>
  );
};

export default AuctionedProductCard;
