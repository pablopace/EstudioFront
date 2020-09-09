import React from "react";
import SimpleTable from "./SimpleTable";
import PaginationTable from "./PaginationTable";
import SortingTable from "./SortingTable";
import { Breadcrumb, SimpleCard } from "matx";

import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";


const AppTable = () => {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Material", path: "/material" },
            { name: "Table" }
          ]}
        />
      </div>

      <SimpleCard>

        <MUIDataTable
          title={"Employee List"}
          data={[
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],
            ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT", "John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL", "Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX", "James Houston", "Test Corp", "Dallas", "TX"],

          ]}
          columns={["Name", "Company", "City", "State", "Name", "Company", "City", "State", "Name", "Company", "City", "State",
            {
              label: "Acciones",
              options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <ButtonGroup>
                      <Tooltip title={"Edit"}>
                        <IconButton onClick={() => console.log(value, tableMeta, updateValue)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Delete"}>
                        <IconButton onClick={() => alert("Delete")}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>
                  )
                },
                filter: false,
                sort: false
              }
            }]}
          options={{
            filterType: 'textField',
            elevation: 0,
            selectableRows: 'none',
            print: false,
            onRowClick: (rowData, rowMeta) => {
              console.log(rowData);
              console.log(rowMeta);
            },
            pagination: false,
            customToolbar: () => {
              return (
                <React.Fragment>
                  <Tooltip title={"Agregar"}>
                    <IconButton onClick={() => alert("agregar")}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </React.Fragment>
              );
            }

          }}
        />

      </SimpleCard>


      <div className="py-3" />


      <SimpleCard title="Simple Table">
        <SimpleTable />
      </SimpleCard>

      <div className="py-3" />

      <SimpleCard title="Pagination Table">
        <PaginationTable />
      </SimpleCard>

      <div className="py-3" />

      <SimpleCard title="Tabla ordenada">
        <SortingTable />
      </SimpleCard>
    </div>
  );
};

export default AppTable;
