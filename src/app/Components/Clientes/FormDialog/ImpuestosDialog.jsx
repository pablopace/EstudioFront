import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TableRow
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Fab from '@material-ui/core/Fab';


const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;

export default function FormDialog(props) {

  let auth_user = window.localStorage.getItem("auth_user");
  auth_user = JSON.parse(auth_user);

  const [cuit, setCuit] = React.useState(props.tablaMeta.rowData[0]);
  const [nombre, setNombre] = React.useState(props.tablaMeta.rowData[1]);
  const [apellido, setApellido] = React.useState(props.tablaMeta.rowData[2]);
  const [open, setOpen] = React.useState(false);
  const [impuestos, setImpuestos] = React.useState([]);




  function handleClickOpen() {

    traerImpuestos();

  }


  function traerImpuestos() {
    axios.get(BACKEND + `/api/impuestos?cuit=${cuit}`)
      .then(response => {

        //setImpuestos(response.data.data[0].cuit)

        setImpuestos([
          {
            nombre: "impuestos uno",
            dueDate: "2020-01-06"
          },
          {
            nombre: "impuestos dos",
            dueDate: "2020-01-06"
          },
          {
            nombre: "impuestos tres",
            dueDate: "2020-01-06"
          },
        ])

        setOpen(true)
      })
      .catch(error => {
        console.log(error);
      })
  }


  function handleClose() {
    setOpen(false);
  }

  function handleSaveAndClose() {

  }


  function borrarImpuesto() {
    console.log("borrar impuesto");
  }

  function handleDateChange(fecha) {
    console.log("fecha nueva seteada: " + fecha);
    traerImpuestos()
  };



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
        <DialogTitle id="form-dialog-title">Impuestos para {nombre} {apellido}</DialogTitle>
        <DialogContent>
          <Fab color="primary" aria-label="add" size="small"  align="right">
            <AddIcon />
          </Fab>
          <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
              <TableHead>
                <TableRow>
                  <TableCell className="px-0">Nombre</TableCell>
                  <TableCell className="px-0">Fecha de Aviso</TableCell>
                  <TableCell className="px-0">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {impuestos.map((i, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-0 capitalize" align="left">
                      {i.nombre}
                    </TableCell>

                    <TableCell className="px-0 capitalize" align="left">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className="mb-4 w-full"
                          margin="none"
                          id="mui-pickers-date"
                          label=""
                          inputVariant="standard"
                          type="text"
                          autoOk={true}
                          value={i.fecha}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>

                    <TableCell className="px-0">
                      <IconButton onClick={borrarImpuesto}>
                        <DeleteIcon fontSize="small" />
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
            Cerrar
          </Button>

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
