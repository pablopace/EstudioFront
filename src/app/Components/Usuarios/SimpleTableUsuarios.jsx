import React, { Component } from "react"
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TableRow
} from "@material-ui/core"
import Loader from "../Utilidades/Loader"
import axios from "axios"
import { withSnackbar } from 'notistack';



class SimpleTableUsuarios extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      usuarios: []
    }
  }


  componentDidMount() {

    axios.get("https://reqres.in/api/users?delay=3")
      .then(response => {
        console.log(response)
        this.setState({
          usuarios: response.data.data,
          loading: false
        })
      })
      .catch(error => {
        console.log(error);
      })
      
  }

  render() {
    const { loading, usuarios } = this.state

    if (loading) {
      return (
        <div className="w-full overflow-auto"><Loader /></div>
      )
    } else {
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
              {usuarios.map((usuario, index) => (
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
        </div>
      );
    }

  }
}


export default withSnackbar(SimpleTableUsuarios);
