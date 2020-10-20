import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Icon from '@material-ui/core/Icon';


const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;

export default function FormDialog(props) {

  let auth_user = window.localStorage.getItem("auth_user");
  auth_user = JSON.parse(auth_user);

  const [user_id, setUser] = React.useState(auth_user.userId);

  const [open, setOpen] = React.useState(false);
  

  function handleClickOpen() {

    setOpen(true);
   
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSaveAndClose() {
    
  }




  return (
    <React.Fragment>
        <Tooltip title={"Impuestos"}>
          <IconButton onClick={handleClickOpen}>
            <Icon fontSize="small" >insert_drive_file</Icon>
          </IconButton>
        </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Impuestos dialog</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="first_name"
            label="Nombre"
            type="text"
            fullWidth
            onChange={e => setUser(e.target.value)}
          />
        
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
         
        </DialogActions>
      </Dialog>
      </React.Fragment>
  );
}
