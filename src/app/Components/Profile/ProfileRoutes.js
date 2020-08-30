import React from "react";
import { authRoles } from "../../auth/authRoles";

const profileRoutes = [ 
  {
    path: "/profile",
    component: React.lazy(() => import("./Profile.jsx")),
    auth: authRoles.admin
  }
]; 

export default profileRoutes;
