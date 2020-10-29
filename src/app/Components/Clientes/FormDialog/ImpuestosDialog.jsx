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
import Switch from '@material-ui/core/Switch';



const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;

export default function FormDialog(props) {

  let auth_user = window.localStorage.getItem("auth_user");
  auth_user = JSON.parse(auth_user);

  const [cuit, setCuit] = React.useState(props.tablaMeta.rowData[0]);
  const [nombre, setNombre] = React.useState(props.tablaMeta.rowData[1]);
  const [apellido, setApellido] = React.useState(props.tablaMeta.rowData[2]);

  const [open, setOpen] = React.useState(false);
  const [openVencimientos, setOpenVencimientos] = React.useState(false);
  const [openAddVencimientos, setOpenAddVencimientos] = React.useState(false);

  const [impuestos, setImpuestos] = React.useState([]);
  const [vencimientos, setVencimientos] = React.useState([]);
  const [listaVencimientos, setListaVencimientos] = React.useState([]);
  const [nameImp, setNameImp] = React.useState("");
  const [idImp, setIdImp] = React.useState("");





  ///Impuestos

  function handleClickOpen() {
    axios.get(BACKEND + `/api/tax/client?cuit=${cuit}`)
      .then(response => {
        setImpuestos(response.data.data)
        setOpen(true)
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleClose() {
    setOpen(false);
  }

  function borrarImpuesto() {
    console.log("borrar impuesto");
  }





  ////Vencimientos

  function AbrirVencimientos(name, tax) {
    console.log("abrir vencimiento", name, tax);
    traerVencimientos(name, tax)
    setOpenVencimientos(true);
  }


  function traerVencimientos(name, tax) {
    axios.get(BACKEND + `/api/tax/client?cuit=${cuit}&tax_id=${tax}`)
      .then(response => {
        setVencimientos(response.data.data)
        setNameImp(name)
        setIdImp(tax)
      })
      .catch(error => {
        console.log(error);
      })
  }

  function CerrarVencimientos() {
    setOpenVencimientos(false);
  }

  function handleDateChange(fecha, due) {
    console.log("fecha nueva seteada: " + fecha + " due:" + due);

    axios.post(BACKEND + `/api/tax/client/alert`, {
      cuit: cuit,
      tax_id: idImp,
      due_id: due,
      alert_date: fecha
    })
      .then(response => {
        traerVencimientos(nameImp, idImp)
      })
      .catch(error => {
        console.log(error);
      })

  };



  ///Agregar Vencimiento

  function abrirAgregarVencimientos() {

    axios.get(BACKEND + `/api/tax/`)
      .then(response => {
        setListaVencimientos(response.data.data)
        setOpenAddVencimientos(true)
      })
      .catch(error => {
        console.log(error);
      })

  }

  function CerrarAddVencimientos() {
    setOpenAddVencimientos(false)
  }

  function handleChangeCheckBox() {
    
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
        <DialogTitle id="form-dialog-title">Impuestos para {nombre} {apellido}</DialogTitle>
        <DialogContent>
          <Fab color="primary" aria-label="add" size="small" align="right">
            <AddIcon onClick={abrirAgregarVencimientos} />
          </Fab>

          <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
              <TableHead>
                <TableRow>
                  <TableCell className="px-0">Nombre</TableCell>
                  <TableCell className="px-0">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {impuestos.map((i, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-0 capitalize" align="left">
                      {i.name}
                    </TableCell>

                    <TableCell className="px-0">
                      <IconButton onClick={() => AbrirVencimientos(i.name, i.tax_id)}>
                        <Icon fontSize="small" >event_note</Icon>
                      </IconButton>
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






      <Dialog
        open={openVencimientos}
        onClose={CerrarVencimientos}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Vencimientos para Impuesto {nameImp} </DialogTitle>
        <DialogContent>
          <div className="w-full overflow-auto">
            {<Table className="whitespace-pre">
              <TableHead>
                <TableRow>
                  <TableCell className="px-0">Nombre</TableCell>
                  <TableCell className="px-0">Fecha de Aviso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vencimientos.map((x, indexDueDate) => (
                  <TableRow key={indexDueDate}>
                    <TableCell className="px-0 capitalize" align="left">
                      {x.name} &lt;{x.date}&gt;
                    </TableCell>

                    <TableCell className="px-0 capitalize" align="left">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className="mb-4 w-full"
                          margin="none"
                          id={"mui-pickers-date" + x.due_id}
                          label=""
                          inputVariant="standard"
                          format="dd/MM/yyyy"
                          type="text"
                          autoOk={true}
                          invalidDateMessage="Fecha invalida"
                          value={x.alert_date ? x.alert_date : null}
                          onChange={val => { handleDateChange(val, x.due_id) }}
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>}
          </div>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={CerrarVencimientos}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>






      <Dialog
        open={openAddVencimientos}
        onClose={CerrarAddVencimientos}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Agregar Impuesto </DialogTitle>
        <DialogContent>
          <div className="w-full overflow-auto">
            {<Table className="whitespace-pre">
              <TableHead>
                <TableRow>
                  <TableCell className="px-0">Id</TableCell>
                  <TableCell className="px-0">Nombre</TableCell>
                  <TableCell className="px-0">Check</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listaVencimientos.map((x, tax_id) => (
                  <TableRow key={tax_id}>
                    <TableCell className="px-0 capitalize" align="left">
                      {x.tax_id}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {x.name}
                    </TableCell>

                    <TableCell className="px-0 capitalize" align="left">
                      <Switch
                        checked={true}
                        onChange={handleChangeCheckBox}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>}
          </div>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={CerrarAddVencimientos}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>


    </React.Fragment>
  );
}
