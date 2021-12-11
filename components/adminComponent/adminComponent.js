import { useEffect, useState } from "react";
import DrawerComposition from "../../composition-drawer/composition-drawer";
import TableData from "../../tabledata";

function App() {
  const [selected, setSelected] = useState("Blog");

  const obj = {
    Blog: "blog",
  };

  const path = obj[selected];

  //   const state = [
  //     [
  //       {
  //         name: "Courses",
  //         sublist: [
  //           "Course",
  //           "Overview",
  //           "Projects",
  //           "Curriculum",
  //           "Faqs",
  //           "Certification",
  //           "Course Dates",
  //           "Offers",
  //           "Headings",
  //         ],
  //       },
  //     ],
  //     "Reviews",
  //     "Author",
  //     [
  //       {
  //         name: "Articles",
  //         sublist: ["Blog Categories", "Articles"],
  //       },
  //     ],
  //     [
  //       {
  //         name: "Categories",
  //         sublist: ["Categories", "Top Level Categories"],
  //       },
  //     ],
  //   ];
  const state = ["Blog"];

  let showData = <TableData />;

  switch (selected) {
    case "Blog":
      showData = <TableData selected={selected} path={path} />;
      break;
    default:
      showData = <h1>Select a table</h1>;
  }

  const setTableFunc = (arg, arg2) => {
    setSelected(arg);
  };

  return (
    <div>
      <DrawerComposition state={state} setTableFunc={setTableFunc}>
        {showData}
      </DrawerComposition>
    </div>
  );
}

export default App;
