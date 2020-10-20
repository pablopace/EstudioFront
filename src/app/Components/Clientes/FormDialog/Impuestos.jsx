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
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [zip_code, setZipCode] = React.useState("");
  const [cuit, setCuit] = React.useState(props.tablaMeta.rowData[0]);
  const [ciudad, setCiudad] = React.useState("");
  const [negocio, setNegocio] = React.useState("");
  const [comercial, setComercial] = React.useState("");

  function handleClickOpen() {
    console.log(props.tablaMeta)

    axios.get(BACKEND + `/api/client?user=${user_id}&cuit=${cuit}`)
      .then(response => {

        setCuit(response.data.data[0].cuit)
        setNombre(response.data.data[0].first_name)
        setApellido(response.data.data[0].last_name)
        setEmail(response.data.data[0].email)
        setAdress(response.data.data[0].address)
        setTelefono(response.data.data[0].phone)
        setZipCode(response.data.data[0].zip_code)
        setCiudad(response.data.data[0].city_id)

        setOpen(true);
          
      })
      .catch(error => {
          console.log(error);
      }) 
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSaveAndClose() {
    axios.post(BACKEND + `/api/client`,{
      "user": user_id,
      "first_name": nombre,
      "last_name": apellido,
      "email": email,
      "phone": telefono, 
      "address": adress, 
      "cuit": cuit, 
      "type_id": 1, 
      "city_id": ciudad, 
      "zip_code": zip_code
  })
      .then(response => {
        props.refreshTableUser();
        setOpen(false);
      })
      .catch(error => {
          console.log(error);
      })  
  }

  function borrarCliente(){
    axios.delete(BACKEND + `/api/client/`, {
      data: { "cuit": cuit },
    })
      .then(response => {
        console.log("OK");
        props.refreshTableUser();
      })
      .catch(error => {
        console.log(error);
      })
  }



  function handleClickImpuestos() {
  
  
  }


  return (
    <div>
       <ButtonGroup>
       <Tooltip title={"Impuestos"}>
          <IconButton onClick={handleClickImpuestos}>
          <Icon fontSize="small">insert_drive_file</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title={"Editar"}>
          <IconButton onClick={handleClickOpen}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Borrar"}>
          <IconButton onClick={borrarCliente}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
      <DialogTitle id="form-dialog-title">Editar Cliente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="first_name"
            label="Nombre"
            type="text"
            fullWidth
            value={nombre}
            onChange={e => setUser(e.target.value) }
          />
          <TextField
            margin="dense"
            id="last_name"
            label="Apellido"
            type="text"
            fullWidth
            value={apellido}
            onChange={e => setApellido(e.target.value) }
          />
          <TextField
            margin="dense"
            id="address"
            label="Dirección"
            type="text"
            fullWidth
            value={adress}
            onChange={e => setAdress(e.target.value) }
          />
          <TextField
            margin="dense"
            id="zip_code"
            label="Código postal"
            type="text"
            fullWidth
            value={zip_code}
            onChange={e => setZipCode(e.target.value) }
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value) }
          />
          <TextField
            margin="dense"
            id="phone"
            label="Telefono"
            type="text"
            fullWidth
            value={telefono}
            onChange={e => setTelefono(e.target.value) }
          />
          <TextField
            margin="dense"
            id="cuit"
            label="CUIT"
            type="text"
            fullWidth
            value={cuit}
            onChange={e => setCuit(e.target.value) }
          />
          <TextField
            margin="dense"
            id="ciudad"
            label="Ciudad"
            type="text"
            fullWidth
            value={ciudad}
            onChange={e => setCiudad(e.target.value) }
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
