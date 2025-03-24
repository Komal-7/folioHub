import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearbarProps {
    onSearch: (search:any) => void
}
const SearchBar = ({ onSearch }:SearbarProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event:any) => {
      setSearchTerm(event.target.value);
      onSearch(event.target.value);
    };

    return (
      <TextField
        id="search-bar"
        className="text"
        onInput={handleChange}
        variant="outlined"
        placeholder="Search for any template..."
        value={searchTerm}
        slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: 35 }
            },
        }}
        sx={{width: 600, borderRadius: 35}}
      />
    );
};

export default SearchBar;