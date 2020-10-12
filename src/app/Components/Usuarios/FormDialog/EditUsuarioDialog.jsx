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
import axios from "axios"
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;

export default function FormDialog(props) {

  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(props.tablaMeta.tableData[props.tablaMeta.rowIndex].user);
  const [pass, setPass] = React.useState(props.tablaMeta.tableData[props.tablaMeta.rowIndex].pass);
  const [nombre, setNombre] = React.useState(props.tablaMeta.tableData[props.tablaMeta.rowIndex].first_name);
  const [apellido, setApellido] = React.useState(props.tablaMeta.tableData[props.tablaMeta.rowIndex].last_name);
  const [email, setEmail] = React.useState(props.tablaMeta.tableData[props.tablaMeta.rowIndex].email);
  const [rol, setRol] = React.useState(props.tablaMeta.tableData[props.tablaMeta.rowIndex].user);
  const [user_id, setUserId] = React.useState(props.tablaMeta.tableData[props.tablaMeta.rowIndex].user_id);

  function handleClickOpen() {
    setOpen(true);
    console.log(props.tablaMeta );
    console.log(props.tablaMeta.tableData[props.tablaMeta.rowIndex].user );

  }

  function handleClose() {
    setOpen(false);
  }

  function handleSaveAndClose() {

    axios.post(BACKEND + `/api/user`, {
      "user": user,
      "first_name": nombre,
      "last_name": apellido,
      "email": email,
      "role_id": rol
    })   
      .then(response => {
        console.log("OK");
        setOpen(false);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function borrarUsuario(){
    axios.delete(BACKEND + `/api/user/`,{
      "user": user,
    })
      .then(response => {
        console.log("OK");
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <ButtonGroup>
        <Tooltip title={"Editar"}>
          <IconButton onClick={handleClickOpen}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Borrar"}>
          <IconButton onClick={borrarUsuario}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </ButtonGroup>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar usuario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="user"
            label="User"
            type="text"
            fullWidth
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          {/* <TextField
            margin="dense"
            id="pass"
            label="Password"
            type="password"
            fullWidth
            value={pass}
            onChange={e => setPass(e.target.value)}
          /> */}
          <TextField
            margin="dense"
            id="first_name"
            label="Nombre"
            type="text"
            fullWidth
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <TextField
            margin="dense"
            id="last_name"
            label="Apellido"
            type="text"
            fullWidth
            value={apellido}
            onChange={e => setApellido(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="role_id"
            label="Rol"
            type="text"
            fullWidth
            value={rol}
            onChange={e => setRol(e.target.value)}
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