import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import ProfileForm from "./ProfileForm"
import CambiarPass from "./CambiarPass"



class Profile extends Component {

  render() {
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Forms", path: "/forms" },
              { name: "Basic" }
            ]}
          />
        </div>
        <SimpleCard title="Perfil" ><ProfileForm /></SimpleCard>
        <div className="py-3" />
        <SimpleCard title="Cambiar Contraseña" ><CambiarPass /></SimpleCard>
      </div>
    );
  }
}

export default Profile;
