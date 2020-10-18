import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import axios from "axios"
import SelectCliente from "./SelectCliente"


const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT;




class Impuestos extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            impuestos: [],
            cliente: ""
        }
    }



    componentDidMount() {

    }


    traerImpuestos = () =>{
        console.log("GET /impuestos para " + this.state.cliente)

        // let auth_user = window.localStorage.getItem("auth_user");
        // auth_user = JSON.parse(auth_user);
        
        // axios.get(BACKEND + `/api/client?user=${auth_user.userId}`)
        //     .then(response => {
                
        //         this.setState({
        //             clientes: response.data.data,
        //             loading: false
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })

    }


    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: "Impuestos", path: "/impuestos" },
                        ]}
                    />
                </div>

                <SimpleCard title="Impuestos">
                    <SelectCliente refreshTable={this.componentDidMount.bind(this)} />
                </SimpleCard>



            </div>
        );
    }

}

export default Impuestos;
