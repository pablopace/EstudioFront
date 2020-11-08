import React, { Fragment } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

const ciudadesMock = [
  { description: "Afghanistan", city_id: 1233 },
  { description: "Aland Islands", city_id: 1233 },
  { description: "Albania", city_id: 1233 },
  { description: "Algeria", city_id: 1233 }
];

const filter = createFilterOptions();

const AutocompleteCiudades = () => {
  const [value, setValue] = React.useState(null);
  const [ciudades, setCiudades] = React.useState(ciudadesMock);


  // axios.get(BACKEND + `/api/catalog/location`)
  // .then(response => {
  //   console.log("buscar listado de ciudades");
  //   setCiudades(response.data.data)
  //   console.log(response.data.data);
  //   setOpen(true);

  // })
  // .catch(error => {
  //   console.log(error);
  // })




  return (
    <Fragment>
      <Autocomplete
        className="mb-4 w-300"
        options={ciudades}
        getOptionLabel={option => option.description}
        renderInput={params => (
          <TextField
            {...params}
            label="Combo box"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </Fragment>
  );
};

export default AutocompleteCiudades;
