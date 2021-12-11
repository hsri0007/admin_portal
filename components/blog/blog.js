import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
// import CustomEditor from "../../../editor";
import CustomDropDown from "../../custom-component/dropdown_component";
// import CustomCourseDropDown from "../../../custom-component/custom_course_dropdown";
import {
  Box,
  Card,
  Grid,
  Switch,
  Chip,
  FormControl,
  Select,
  InputLabel,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel,
  Button,
  Container,
} from "@material-ui/core";
import QuillEditor from "../../custom-component/custom_editor";
// import { addData, updateData } from "../../../apiCalls";

const BlogComponent = ({
  state,
  isEdit,
  handleClose,
  newDataChange,
  courseData,
}) => {
  const [description, setDescription] = useState(
    isEdit ? (state?.content ? state?.content : "") : ""
  );
  const [show, setShow] = useState(false);
  const [imname, setImname] = useState(
    isEdit ? (state?.curriculum_pdf ? state?.curriculum_pdf : "1") : "2"
  );
  const [statusState, setStatusState] = React.useState(state.status ? 1 : 0);
  const [course_details, setCoursesDetails] = useState(
    isEdit
      ? courseData[
          courseData.findIndex((res) => +res.id === +state.category)
        ] || 0
      : {}
  );

  const NewUserSchema = Yup.object().shape({
    // course: Yup.string().required("course is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: isEdit ? (state?.title ? state?.title : "") : "",
      meta_title: isEdit ? (state?.meta_title ? state?.meta_title : "") : "",
      meta_desc: isEdit ? (state?.meta_desc ? state?.meta_desc : "") : "",
      slug: isEdit ? (state?.slug ? state?.slug : "") : "",
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const data = {
        ...values,
        content: description,
        status: statusState,
      };
      console.log(data);
      handleClose();
      //   try {
      //     if (!isEdit) {
      //       console.log("add");
      //       addData({
      //         path: "courses",
      //         data,
      //       }).then(() => {
      //         handleClose();
      //         newDataChange();
      //       });
      //     } else {
      //       console.log("edit");
      //       updateData({
      //         path: "courses",
      //         data,
      //         id: state.id,
      //       }).then(() => {
      //         handleClose();
      //         newDataChange();
      //       });
      //     }
      //   } catch (error) {
      //     console.error(error);
      //     setSubmitting(false);
      //     setErrors(error);
      //   }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;
  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Title"
                {...getFieldProps("title")}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <span>Content</span>
              <QuillEditor state={description} setState={setDescription} />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Meta Title"
                {...getFieldProps("meta_title")}
                error={Boolean(touched.meta_title && errors.meta_title)}
                helperText={touched.meta_title && errors.meta_title}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <span>Meta Description</span>
              <TextareaAutosize
                style={{ width: "100%", padding: "10px 10px" }}
                variant="outlined"
                aria-label="minimum height"
                minRows={3}
                placeholder="Enter here"
                {...getFieldProps("meta_desc")}
                error={Boolean(touched.meta_desc && errors.meta_desc)}
                helperText={touched.meta_desc && errors.meta_desc}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="slug"
                {...getFieldProps("slug")}
                error={Boolean(touched.slug && errors.slug)}
                helperText={touched.slug && errors.slug}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CustomDropDown
                statusState={statusState}
                setStatusState={setStatusState}
              />
            </Grid>
            <div style={{ paddingLeft: "10px", margin: "20px 0px" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                // loading={isSubmitting}
              >
                {/* {!isEdit ? 'Create User' : 'Save Changes'} */}
                submit
              </Button>
            </div>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
};

export default BlogComponent;
