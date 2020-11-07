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
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';

const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;

const ciudadesMock = [
  {
    name: "Buenos Aires, CABA",
    city_id: 1
  },
  {
    name: "Buenos Aires, Avellaneda",
    city_id: 2
  },
  {
    name: "Buenos Aires, Lanus",
    city_id: 3
  },
  {
    name: "Cordoba, La Falda",
    city_id: 4
  }
]

export default function FormDialog({ refreshTableClientes }) {

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
  const [cuit, setCuit] = React.useState("");
  const [ciudad, setCiudad] = React.useState("");
  const [negocio, setNegocio] = React.useState("");
  const [comercial, setComercial] = React.useState("");

  const [ciudades, setCiudades] = React.useState([]);




  function handleClickOpen() {

    axios.get(BACKEND + `/api/cities`)
      .then(response => {
        console.log("buscar listado de ciudades");
        setCiudades(ciudadesMock)
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
    axios.put(BACKEND + `/api/client`, {
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
        console.log("cliente agregado");
        refreshTableClientes();
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
            onChange={e => setNombre(e.target.value)}
          />
          <TextField
            margin="dense"
            id="last_name"
            label="Apellido"
            type="text"
            fullWidth
            onChange={e => setApellido(e.target.value)}
          />
          <TextField
            margin="dense"
            id="address"
            label="Dirección"
            type="text"
            fullWidth
            onChange={e => setAdress(e.target.value)}
          />
          <TextField
            margin="dense"
            id="zip_code"
            label="Código postal"
            type="text"
            fullWidth
            onChange={e => setZipCode(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Telefono"
            type="text"
            fullWidth
            onChange={e => setTelefono(e.target.value)}
          />
          <TextField
            margin="dense"
            id="cuit"
            label="CUIT"
            type="text"
            fullWidth
            onChange={e => setCuit(e.target.value)}
          />

          <InputLabel style={  {marginTop: 15}} htmlFor="ciudad-native-simple">Ciudad</InputLabel>
          <Select style={  {minWidth: 535.2, }}
          margin="dense"
            native
            value={ciudad}
            onChange={e => setCiudad(e.target.value)}
            inputProps={{
              name: 'ciudad-native-simple',
              id: 'ciudad-native-simple',
            }}
          >
            <option aria-label="None" value="" />

            {ciudades.map( c => <option value={c.city_id}>{c.name}</option>)}
            
          </Select>



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
