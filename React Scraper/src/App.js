import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

// Custom imports
import useAxios from "./useAxios";
import { columns, options } from "./App.logic";

function App() {
  // Pagination Options for server side pagination
  const [paginationOptions, setPaginationOptions] = useState({
    sizeOfPage: 10,
    pageNumber: 1,
    name: "",
  });

  const { sizeOfPage: size, pageNumber: page, name } = paginationOptions;

  const { response: data } = useAxios({ size, page, name }); // API call through axios custom hook for scrape data

  // MUIDataTable change page function for server side pagination
  const changePage = (newPage) => {
    setPaginationOptions({ ...paginationOptions, pageNumber: newPage + 1 });
  };

  // MUIDataTable change rows per page function for server side pagination
  const changeRowsPerPage = (rowsPerPage) => {
    setPaginationOptions({
      ...paginationOptions,
      sizeOfPage: rowsPerPage,
      pageNumber: 1,
    });
  };

  // MUIDataTable search function for server side pagination
  const search = (queryString, paginationOptions) => {
    const name = queryString ? queryString.trim() : queryString;

    if (name) {
      setPaginationOptions({
        ...paginationOptions,
        pageNumber: 1,
        name,
      });
    } else if (name === null && paginationOptions.name !== "") {
      setPaginationOptions({
        ...paginationOptions,
        name: "",
      });
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <MUIDataTable
        title={"Media Scraping List"}
        data={data?.scrapeData} // data
        columns={columns(data)} // table columns
        options={options(       // Configuration options
          data,
          paginationOptions,
          changePage,
          changeRowsPerPage,
          search
        )}
      />
    </ThemeProvider>
  );
}

export default App;
