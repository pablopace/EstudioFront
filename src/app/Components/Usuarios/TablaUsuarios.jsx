import React, { Component } from 'react'
import MUIDataTable from "mui-datatables"
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Loader from "../Utilidades/Loader"
import axios from "axios"
import { withSnackbar } from 'notistack';
import AltaUsuarioDialog from './FormDialog/AltaUsuarioDialog';
import EditUsuarioDialog from './FormDialog/EditUsuarioDialog';

const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;

class TablaUsuarios extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            usuarios: [],
            filaSeleccionada: {}
        }
    }

    componentDidMount() {

        //let auth_user = window.localStorage.getItem("auth_user");
        //auth_user = JSON.parse(auth_user);

        //axios.get(BACKEND + `/api/user?user=${auth_user.userId}`)
        axios.get(BACKEND + `/api/user`)
            .then(response => {

                this.setState({
                    usuarios: response.data.data,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    refreshTableUser = () => {
        axios.get(BACKEND + `/api/user`)
            .then(response => {

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
                <div className="w-full overflow-auto justify-center"><Loader /></div>
            )
        } else {
            return (
                <>
                    <MUIDataTable
                        title={"Usuarios"}
                        data={usuarios}
                        columns={[
                            {
                                name: "user",
                                label: "Usuario",
                            },
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
                                name: "role_desc",
                                label: "Rol",
                            },
                            {
                                name: "id", // ponerle algun nombre de las otras columnas
                                label: "",
                                options: {
                                    customBodyRender: (value, tableMeta, updateValue) => {
                                        return (
                                            <React.Fragment>
                                                <EditUsuarioDialog tablaMeta={tableMeta} refreshTableUser={this.refreshTableUser.bind(this)} />
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
                                        <AltaUsuarioDialog refreshTableUser={this.refreshTableUser.bind(this)} />
                                    </React.Fragment>
                                );
                            }
                        }}
                    />
                </>
            )
        }
    }
}


export default withSnackbar(TablaUsuarios);