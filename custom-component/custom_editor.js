import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const QuillEditor = ({ state, setState }) => {
  return <ReactQuill value={state} onChange={setState} />;
};

export default QuillEditor;
