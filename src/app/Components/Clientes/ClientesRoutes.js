import React from "react";
import { authRoles } from "../../auth/authRoles";

const ClientesRoutes = [ 
  {
    path: "/clientes",
    component: React.lazy(() => import("./Clientes.jsx")),
    auth: authRoles.admin
  }
]; 

export default ClientesRoutes;
