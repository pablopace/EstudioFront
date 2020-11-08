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

export default function FormDialog({ refreshTableUser }) {
  const [open, setOpen] = React.useState(false);

  const [role_id, setRol] = React.useState("");
  const [roles, setRoles] = React.useState([]);

  function handleClickOpen() {

    axios.get(BACKEND + `/api/catalog/role`)
      .then(response => {
        console.log("buscar listado de roles");
        setRoles(response.data.data)
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
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    console.log("Listo pata llamar al servicio");

    var data = {
      "user": user,
      "pass": pass,
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "role_id": role_id
    };

    var config = {
      method: 'put',
      url: BACKEND + `/api/user`,
      data: data
    };

    axios(config)
      .then(response => {
        console.log("OK");
        setOpen(false);
        refreshTableUser()
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
          {/* <TextField
            margin="dense"
            id="role_id"
            label="Rol"
            type="text"
            fullWidth
          /> */}

          <InputLabel style={{ marginTop: 15 }} htmlFor="rol-native-simple">Rol</InputLabel>
          <Select style={{ minWidth: 535.2, }}
            margin="dense"
            native
            value={role_id}
            onChange={e => setRol(e.target.value)}
            inputProps={{
              name: 'rol-native-simple',
              id: 'rol-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            {roles.map( r => <option value={r.role_id}>{r.role_desc}</option>)}

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
