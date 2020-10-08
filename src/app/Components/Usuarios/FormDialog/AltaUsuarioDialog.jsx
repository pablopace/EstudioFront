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

const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSaveAndClose() {
    let first_name = document.getElementById("first_name");
    let last_name = document.getElementById("last_name");
    let address = document.getElementById("address");
    let zip_code = document.getElementById("zip_code");

    /*axios.post(BACKEND + `/api/user?user=${auth_user.userId}`)
      .then(response => {

        setOpen(false);
          
      })
      .catch(error => {
          console.log(error);
      })*/  
  }

  return (
    <div>
      <Tooltip title={"Agregar"}>
          <IconButton onClick={handleClickOpen}>
              <AddIcon />
          </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
      <DialogTitle id="form-dialog-title">Nuevo usuario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="user"
            label="User"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="pass"
            label="Password"
            type="password"
            fullWidth
          />
          <TextField
            margin="dense"
            id="first_name"
            label="Nombre"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="last_name"
            label="Apellido"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="role_id"
            label="Rol"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveAndClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
