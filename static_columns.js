//===================================Webinars=============================================

export const blogColumns = [
  {
    name: "id",
    label: "Id",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "title",
    label: "Title",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (data, dataIndex, rowIndex) => {
        return <>{data === 0 ? "Inactive" : "Active"}</>;
      },
    },
  },
];
