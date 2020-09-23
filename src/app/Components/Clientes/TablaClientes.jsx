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

const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;

class TablaClientes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            clientes: []
        }
    }

    componentDidMount() {

        let auth_user = window.localStorage.getItem("auth_user");
        auth_user = JSON.parse(auth_user);
        
        axios.get(BACKEND + `/api/user/${auth_user.userId}`)
            .then(response => {
                
                this.setState({
                    clientes: response.data.data.client,
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
                    title={"Clientes"}
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
                                        <ButtonGroup>
                                            <Tooltip title={"Editar"}>
                                                <IconButton onClick={() => console.log(value, tableMeta, updateValue)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={"Borrar"}>
                                                <IconButton onClick={() => alert("Delete")}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </ButtonGroup>
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
                            console.log(rowData);
                            console.log(rowMeta);
                        },
                        pagination: false,
                        customToolbar: () => {
                            return (
                                <React.Fragment>
                                    <Tooltip title={"Agregar"}>
                                        <IconButton onClick={() => alert("agregar")}>
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
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