import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';

const useStyles = makeStyles({
  dragbar: {
    "-webkit-app-region": "drag",
  },
  closeButton: {
    width: "40px",
    height: "100%",
    float: "right",
    backgroundColor: "rgba(255,0,0,0.5)",
    transition: "0.2s",
    "-webkit-app-region": "no-drag",
    '&:hover': {
      backgroundColor: "red",
    }
  },
  closeIcon: {
    width: '100%',
    height: '100%',
    transition: "0.2s",
    fill: 'rgba(255,255,255, 0.5)',
    '&:hover': {
      fill: "white",
    }
  }
});

function closeElectronWindow() {
  window.ipcRenderer.send("close-window");
}

function ElectronBar() {
  const classes = useStyles();
  return (
    <div className={classes.dragbar}>
      <div onClick={closeElectronWindow} className={classes.closeButton}> 
        <CloseTwoToneIcon className={classes.closeIcon} /> 
      </div>
    </div>
  );
}

export default ElectronBar;
