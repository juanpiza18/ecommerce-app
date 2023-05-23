import { Box, Button, ButtonGroup, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useProductActions } from "../../hooks/useProductData.hook";

const Search = () => {
  const [search, setSearch] = useState("");
  const { setFilterValue } = useProductActions();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (event.target.value.length === 0) {
      setFilterValue("");
    }
  };
  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFilterValue(search);
  };

  const handleClear = () => {
    setSearch("");
    setFilterValue("");
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: {
          xs: "90%",
          md: 1000,
        },
      }}
      onSubmit={handleOnSubmit}
    >
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          marginRight: "1rem",
        }}
        type="text"
        variant="standard"
        label="Search"
        placeholder="Search Product"
        fullWidth
        required
        onChange={handleChange}
        value={search}
      />
      <ButtonGroup>
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
        {search && (
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleClear}
          >
            Clear
          </Button>
        )}
      </ButtonGroup>
    </Box>
  );
};

export default Search;
