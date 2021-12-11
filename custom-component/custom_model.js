import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { Container } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  handleClickOpen,
  handleClose,
  Showmodel,
  state,
  isEdit,
  courseData,
  newDataChange,
}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        disableEnforceFocus
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {isEdit ? "Edit" : "Add"}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <div
          style={{
            width: "96vw",
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: "6vh",
          }}
        >
          {/* <CourseModel /> */}
          <Showmodel
            state={state}
            isEdit={isEdit}
            courseData={courseData}
            handleClose={handleClose}
            newDataChange={newDataChange}
          />
        </div>
      </Dialog>
    </div>
  );
}
