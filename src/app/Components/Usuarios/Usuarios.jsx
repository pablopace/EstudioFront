import React, { Component } from "react";
import SimpleTableUsuarios from "./SimpleTableUsuarios";
import { Breadcrumb, SimpleCard } from "matx";
import Snackbar from "@material-ui/core/Snackbar";

class Usuarios extends Component {
        
    render() {
        return (
            <SimpleCard title="Usuarios">
                <SimpleTableUsuarios />

            </SimpleCard>
            
        );
    }

}

export default Usuarios;
