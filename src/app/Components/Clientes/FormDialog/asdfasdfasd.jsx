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
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TableRow
} from "@material-ui/core";


const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;

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

  function handleClickOpen() {
    setOpen(true);
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Impuestos para {nombre} {apellido}</DialogTitle>
        <DialogContent>

          <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
              <TableHead>
                <TableRow>
                  <TableCell className="px-0">Name</TableCell>
                  <TableCell className="px-0">Company</TableCell>
                  <TableCell className="px-0">Start Date</TableCell>
                  <TableCell className="px-0">Status</TableCell>
                  <TableCell className="px-0">Amount</TableCell>
                  <TableCell className="px-0">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscribarList.map((subscriber, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-0 capitalize" align="left">
                      {subscriber.name}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {subscriber.company}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {subscriber.date}
                    </TableCell>
                    <TableCell className="px-0 capitalize">
                      {subscriber.status}
                    </TableCell>
                    <TableCell className="px-0 capitalize">
                      ${subscriber.amount}
                    </TableCell>
                    <TableCell className="px-0">
                      <IconButton>
                        <Icon color="error">close</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>


        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
