import React from "react";
import { authRoles } from "../../auth/authRoles";

const usuariosRoutes = [ 
  {
    path: "/usuarios",
    component: React.lazy(() => import("./Usuarios.jsx")),
    auth: authRoles.admin
  }
]; 

export default usuariosRoutes;
