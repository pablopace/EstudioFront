import React, { Component } from "react";
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination
} from "@material-ui/core";
import Loader from "../Utilidades/Loader"
import axios from "axios"
import { withSnackbar } from 'notistack'


class UsuariosPaginationTable extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      usuarios: [],
      rowsPerPage: 2,
      total: 0,
      page: 0
    }
  }

  componentDidMount() {
    this.traerDatos(this.state.page, this.state.rowsPerPage)
  }

  traerDatos(page, rowsPerPage){
    axios.get(`https://reqres.in/api/users?page=${page}&per_page=${rowsPerPage}`)
    .then(response => {
      console.log(`total de registros ${response.data.total}`)
      this.setState({
        usuarios: response.data.data,
        loading: false,
        total: response.data.total,
        page: page,
        rowsPerPage: rowsPerPage
      })
    })
    .catch(error => {
      console.log(error);
    })
  }


  handleChangePage = (event, newPage) => {
    console.log(`traer la pagina: ${newPage}`)
    this.traerDatos(newPage, this.state.rowsPerPage)    
  };

  handleChangeRowsPerPage = event => {
    //setRowsPerPage(+event.target.value);
    console.log(`por pagina ahora son ${event.target.value}`)
    this.traerDatos(this.state.page, event.target.value)
  };

  render() {
    const { loading, usuarios, rowsPerPage, page, total } = this.state

    console.log(this.state)

    return (
      <div className="w-full overflow-auto">
        <Table className="whitespace-pre">
          <TableHead>
            <TableRow>
              <TableCell className="px-0">Id</TableCell>
              <TableCell className="px-0">Nombre</TableCell>
              <TableCell className="px-0">Apellido</TableCell>
              <TableCell className="px-0">email</TableCell>
              <TableCell className="px-0">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((usuario, index) => (
                <TableRow key={index}>
                  <TableCell className="px-0 capitalize" align="left">{usuario.id}</TableCell>
                  <TableCell className="px-0 capitalize" align="left">{usuario.first_name}</TableCell>
                  <TableCell className="px-0 capitalize" align="left">{usuario.last_name}</TableCell>
                  <TableCell className="px-0 capitalize">{usuario.email}</TableCell>
                  <TableCell className="px-0">
                    <IconButton><Icon >mode_edit</Icon></IconButton>
                    <IconButton><Icon >clear</Icon></IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          className="px-4"
          rowsPerPageOptions={[2, 3, 4]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{ "aria-label": "Página Anterior" }}
          nextIconButtonProps={{ "aria-label": "Próxima Página" }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
};

export default UsuariosPaginationTable;
