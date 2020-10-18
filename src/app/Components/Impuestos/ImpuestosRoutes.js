import React from "react";
import { authRoles } from "../../auth/authRoles";

const ImpuestosRoutes = [ 
  {
    path: "/impuestos",
    component: React.lazy(() => import("./Impuestos.jsx")),
    auth: authRoles.admin
  }
]; 

export default ImpuestosRoutes;
