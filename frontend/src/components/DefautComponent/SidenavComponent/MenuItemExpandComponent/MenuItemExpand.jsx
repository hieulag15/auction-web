import React from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import {
  StyledListItem,
  StyledListItemButton,
  StyledListItemIcon,
  StyledListItemText,
  StyledSubListItemButton,
} from './style'; // Đường dẫn tới file chứa các styled components

const MenuItemExpand = ({ itemOpen, item, handleClick }) => {
  const navigate = useNavigate();

  return (
    <>
      <StyledListItem disablePadding onClick={handleClick}>
        <StyledListItemButton>
          <StyledListItemIcon>
            {item.icon}
          </StyledListItemIcon>
          <StyledListItemText primary={item.name}/>
          {itemOpen ? <ExpandLess /> : <ExpandMore />}
        </StyledListItemButton>
      </StyledListItem>
      <Collapse in={itemOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.subItems.map((subItem, subIndex) => (
            <StyledSubListItemButton
              key={subIndex}
              onClick={() => navigate(subItem.path)}
            >
              <StyledListItemText primary={subItem.name} />
            </StyledSubListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default MenuItemExpand;