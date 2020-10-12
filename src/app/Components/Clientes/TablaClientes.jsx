import React, { Component } from 'react'
import MUIDataTable from "mui-datatables"
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Loader from "../Utilidades/Loader"
import localStorageService from "../../services/localStorageService";
import axios from "axios"
import { withSnackbar } from 'notistack';
import AltaClientesDialog from './FormDialog/AltaClienteDialog'
import EditClienteDialog from './FormDialog/EditClienteDialog'

const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;

class TablaClientes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            clientes: [],
            filaSeleccionada: {}
        }
    }

    componentDidMount() {

        let auth_user = window.localStorage.getItem("auth_user");
        auth_user = JSON.parse(auth_user);
        
        axios.get(BACKEND + `/api/user?user=${auth_user.userId}`)
            .then(response => {
                
                this.setState({
                    clientes: response.data.data.client_pf,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        const { loading, clientes } = this.state

        if (loading) {
            return (
                <div className="w-full overflow-auto justify-center"><Loader /></div>
            )
        } else {
            return (
                <MUIDataTable
                    title={"Clientes (persona física)"}
                    data={clientes}
                    columns={[ 
                       /*{
                        name: "client_id",
                        label: "Id",
                       },*/
                       {
                        name: "first_name",
                        label: "Nombre",
                       },
                       {
                        name: "last_name",
                        label: "Apellido",
                       },
                       {
                        name: "email",
                        label: "Email",
                       },
                       {
                        name: "phone",
                        label: "Teléfono",
                       },                  
                        {
                            name: "id", // ponerle algun nombre de las otras columnas
                            label: "",
                            options: {
                                customBodyRender: (value, tableMeta, updateValue) => {
                                    return (
                                        <React.Fragment>
                                                <EditClienteDialog tablaMeta={tableMeta} />
                                            </React.Fragment>
                                    )
                                },
                                filter: false,
                                sort: false
                            }
                        }]}
                    options={{
                        filterType: 'textField',
                        elevation: 0,
                        selectableRows: 'none',
                        print: false,
                        onRowClick: (rowData, rowMeta) => {
                            this.setState({
                                filaSeleccionada: rowMeta
                            })
                        },
                        pagination: true,
                        customToolbar: () => {
                            return (
                                <React.Fragment>
                                    <AltaClientesDialog refreshTableClientes={this.componentDidMount.bind(this)} />
                                </React.Fragment>
                            );
                        }
                    }}
                />
            )
        }
    }
}


export default withSnackbar(TablaClientes);