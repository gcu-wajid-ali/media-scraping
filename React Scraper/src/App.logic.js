import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// MUIDataTable Columns
export const columns = (data) => [
  {
    name: "id",
    label: "ID",
    options: {
      sort: false,
    },
  },
  {
    name: "name",
    label: "Name",
    options: {
      sort: false,
    },
  },
  {
    name: "type",
    label: "Type",
    options: {
      sort: false,
    },
  },
  {
    name: "url",
    label: "View",
    options: {
      sort: false,
      customBodyRenderLite: (dataIndex) => {
        const url = data["scrapeData"][dataIndex].url;

        return (
          <IconButton aria-label="View" title="View" onClick={() => window.open(url, "_blank")}>
            <OpenInNewIcon />
          </IconButton>
        );
      },
    },
  },
];

// MUIDataTable Configuration Options
export const options = (
  data,
  paginationOptions,
  changePage,
  changeRowsPerPage,
  search
) => {
  return {
    selectableRows: "none",
    searchPlaceholder: "Search by Name",
    filter: false,

    serverSide: true,
    count: data.totalCount,
    rowsPerPage: paginationOptions.sizeOfPage,
    page: paginationOptions.pageNumber - 1,
    rowsPerPageOptions: [10, 20, 50],
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          changePage(tableState.page);
          break;
        case "changeRowsPerPage":
          changeRowsPerPage(tableState.rowsPerPage);
          break;
        case "search":
          search(tableState.searchText, paginationOptions);
          break;
        default:
          break;
      }
    },
  };
};
