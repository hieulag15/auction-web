import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Container, Box, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { useGetCategory } from '~/hooks/categoryHook';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CategoryBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data } = useGetCategory();
  const items = Array.isArray(data) ? data : [];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Box display="flex" justifyContent="space-between">
              {items.map((category) => (
                <Button 
                  key={category.id}
                  color="inherit"
                  component={Link}
                  to={`/customer-asset`} 
                  onClick={handleClick}
                >
                  <Typography variant="h7" fontWeight="bold">
                    {category.categoryName}
                  </Typography>
                  <ArrowDropDownIcon />
                </Button>
              ))}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((category) => (
          <MenuItem 
            key={category.id} 
            component={Link}
            to={`/customer`} 
            onClick={handleClose}
          >
            <Typography variant="h8">
              {category.categoryName}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CategoryBar;
