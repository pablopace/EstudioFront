import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import TablaClientes from "./TablaClientes";




class Clientes extends Component {

    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: "Clientes", path: "/clientes" },
                        ]}
                    />
                </div>
                <SimpleCard>
                    <TablaClientes />
                </SimpleCard>

            </div>
        );
    }

}

export default Clientes;
