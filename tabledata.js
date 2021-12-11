import React, { useEffect, useState, useRef } from "react";
import MUIDataTable from "mui-datatables";
import { blogColumns } from "./static_columns";
// import { getTableData } from "./apiCalls";
import { Button, CircularProgress } from "@material-ui/core";
import CustomModel from "./custom-component/custom_model";
import BlogModel from "./components/blog/blog";

const TableData = ({ selected, path }) => {
  //   const columns = ["Name", "Company", "City", "State"];
  const [data, setData] = useState([
    {
      id: 1,
      title: "blog",
      meta_title: "blog",
      meta_desc: "blog",
      slug: "blog",
      content: "blog",
      status: 1,
    },
  ]);
  const [courseData, setCourseData] = useState([]);
  const [state, setState] = useState({});
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const lim = useRef(null);
  const offs = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setState({});
  };

  const columns = {
    Blog: blogColumns,
  };
  useEffect(() => {
    setLoading(true);
  }, [path]);
  // useEffect(() => {
  //   lim.current = 0;
  //   offs.current = 10;
  // }, [path]);

  // useEffect(() => {
  //   setLoading(false);
  //   console.log(path);
  //   if (path) {
  //     getTableData({ path, limit: 10, offset: 0 }).then((res) => {
  //       setData(res.final_obj);
  //       setCount(res.count);
  //       setLoading(true);
  //       if (res?.course_data) {
  //         setCourseData(res?.course_data);
  //       }
  //     });
  //   }
  // }, [path]);

  const togglePage = async (number, rowsPerPage) => {
    try {
      let config = {
        path: path,
        limit: rowsPerPage,
        offset: number * rowsPerPage,
      };

      // getTableData(config).then((res) => {
      //   setData(res.final_obj);
      //   setCount(res.count);
      //   if (res?.course_data) {
      //     setCourseData(res?.course_data);
      //   }
      // });
    } catch (error) {
      console.log(error);
    }
  };
  const newDataChange = async () => {
    console.log("new data change triggered");
    try {
      let config = {
        path: path,
        limit: offs.current,
        offset: lim.current * offs.current,
      };

      // getTableData(config).then((res) => {
      //   setData(res.final_obj);
      //   setCount(res.count);
      //   if (res?.course_data) {
      //     setCourseData(res?.course_data);
      //   }
      // });
    } catch (error) {
      console.log(error);
    }
  };
  const searchPage = async (number, rowsPerPage, search) => {
    try {
      let config = {
        path: path,
        limit: rowsPerPage,
        offset: number * rowsPerPage,
        search_string: search,
      };

      // getTableData(config).then((res) => {
      //   setData(res.final_obj);
      //   setCount(res.count);
      //   if (res?.course_data) {
      //     setCourseData(res?.course_data);
      //   }
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    filter: false,
    pagination: true,
    serverSide: true,
    onSearchClose: () => togglePage(0, 10),
    search: true,
    draggableColumns: {
      enabled: true,
    },
    sort: true,
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    rowHover: true,
    onTableInit: async () => {
      togglePage(0, 10);
    },
    onTableChange: async (action, tableState) => {
      console.log(action);
      if (action === "changePage") {
        if (tableState.searchText !== null) {
          lim.current = tableState.page;
          offs.current = tableState.rowsPerPage;
          searchPage(
            tableState.page,
            tableState.rowsPerPage,
            tableState.searchText
          );
        } else {
          lim.current = tableState.page;
          offs.current = tableState.rowsPerPage;
          togglePage(tableState.page, tableState.rowsPerPage);
        }
      } else if (action === "changeRowsPerPage") {
        lim.current = tableState.page;
        offs.current = tableState.rowsPerPage;
        togglePage(tableState.page, tableState.rowsPerPage);
      } else if (action === "search") {
        lim.current = tableState.page;
        offs.current = tableState.rowsPerPage;
        searchPage(
          tableState.page,
          tableState.rowsPerPage,
          tableState.searchText
        );
      } else if (action === "onSearchClose") {
        lim.current = tableState.page;
        offs.current = tableState.rowsPerPage;
        togglePage(0, 10);
      }
    },
    count: count,
    jumpToPage: true,
    selectableRows: "none",
  };
  const modi_column = [
    ...columns[selected],
    {
      name: "Edit",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              style={{ outline: "none" }}
              color="primary"
              variant="contained"
              onClick={() => {
                setIsEdit(true);
                handleClickOpen();
                setState(data[tableMeta.rowIndex]);
              }}
            >
              Edit
            </Button>
          );
        },
      },
    },
  ];

  let showData = BlogModel;

  switch (selected) {
    case "Blog":
      showData = BlogModel;
      break;
    default:
      showData = <h1>Select a table</h1>;
  }

  if (!loading) {
    return (
      <>
        <CircularProgress color="secondary" />
      </>
    );
  }

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Add new Record
      </Button>
      <CustomModel
        open={open}
        handleClickOpen={handleClickOpen}
        // newDataChange={newDataChange}
        handleClose={handleClose}
        Showmodel={showData}
        courseData={courseData}
        state={state}
        isEdit={isEdit}
      />
      {loading && (
        <MUIDataTable
          title={selected}
          data={data}
          columns={modi_column}
          options={options}
        />
      )}
    </div>
  );
};

export default TableData;
