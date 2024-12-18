import React from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { StyledSearchTextField } from './style'

const SearchTextField = ({ value, onChange, ...props }) => {
  return (
    <StyledSearchTextField
      value={value}
      onChange={onChange}
      placeholder="Search..."
      variant="outlined"
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'grey.500' }} />
          </InputAdornment>
        )
      }}
    />
  )
}

export default SearchTextField