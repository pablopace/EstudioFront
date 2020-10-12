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

export default function FormDialog({refreshTableClientes}) {
  
  const [open, setOpen] = React.useState(false);
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [zip_code, setZipCode] = React.useState("");
  const [user_id, setUser] = React.useState("");
  const [cuil, setCuil] = React.useState("");
  const [ciudad, setCiudad] = React.useState("");
  const [negocio, setNegocio] = React.useState("");
  const [comercial, setComercial] = React.useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSaveAndClose() {
    axios.put(BACKEND + `/api/client`, {
      // "user":user,
      // "pass":pass,
      // "first_name":nombre,
      // "last_name":apellido,
      // "email":email,
      // "role_id":rol
    })
      .then(response => {
        console.log("OK");
        setOpen(false);
          
      })
      .catch(error => {
          console.log(error);
      })  
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
      <DialogTitle id="form-dialog-title">Nuevo Cliente</DialogTitle>
      <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="first_name"
            label="Nombre"
            type="text"
            fullWidth
            onChange={e => setUser(e.target.value) }
          />
          <TextField
            margin="dense"
            id="last_name"
            label="Apellido"
            type="text"
            fullWidth
            onChange={e => setApellido(e.target.value) }
          />
          <TextField
            margin="dense"
            id="address"
            label="Dirección"
            type="text"
            fullWidth
            onChange={e => setAdress(e.target.value) }
          />
          <TextField
            margin="dense"
            id="zip_code"
            label="Código postal"
            type="text"
            fullWidth
            onChange={e => setZipCode(e.target.value) }
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={e => setEmail(e.target.value) }
          />
          <TextField
            margin="dense"
            id="phone"
            label="Telefono"
            type="text"
            fullWidth
            onChange={e => setTelefono(e.target.value) }
          />
          <TextField
            margin="dense"
            id="cuit"
            label="CUIT"
            type="text"
            fullWidth
            onChange={e => setCuil(e.target.value) }
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
