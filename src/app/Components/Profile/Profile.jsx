import React, { Component } from "react";
import { Breadcrumb } from "matx";
import ProfileForm from "./ProfileForm"
import { Card } from "@material-ui/core";

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
        <Card className="px-6 pt-2 pb-4"><ProfileForm /></Card>
      </div>
    );
  }
}

export default Profile;
