import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import TablaUsuarios from "./TablaUsuarios";




class Usuarios extends Component {

    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: "Usuarios", path: "/usuarios" },
                        ]}
                    />
                </div>
                <SimpleCard>
                    <TablaUsuarios />
                </SimpleCard>

            </div>
        );
    }

}

export default Usuarios;
