import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios"
import { withSnackbar } from 'notistack';

const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT

class ProfileForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      password: "",
      confirmPassword: "",
    }
  }

  // state = {
  //   password: "",
  //   confirmPassword: "",
  // };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleSubmit = event => {

    axios.post(BACKEND + "/api/user/change", {
      "pass": this.state.password
    })
      .then(response => {
        console.log("api/user/change ", response)
        if (response.status >= 200 && response.status <= 299) {
          return response.data;
        } else {
          throw Error(response.statusText);
        }
      })
      .then(data => {
        console.log("data", data)

        this.props.enqueueSnackbar("Password cambiado con éxito", { variant: 'success', });
      })


    console.log("submitted");
    event.preventDefault();
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };



  render() {
    let { password, confirmPassword } = this.state;

    return (
      <div>
        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => null} >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>

              <TextValidator
                className="mb-4 w-full"
                label="Password"
                onChange={this.handleChange}
                name="password"
                type="password"
                value={password}
                validators={["required"]}
                errorMessages={["Este campo es requerido"]}
              />

              <TextValidator
                className="mb-4 w-full"
                label="Repetir Password"
                onChange={this.handleChange}
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                validators={["required", "isPasswordMatch"]}
                errorMessages={[
                  "Este campo es requerido",
                  "Las passwords no coinciden"
                ]}
              />

            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <span className="pl-2 capitalize">Cambiar</span>
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withSnackbar(ProfileForm);
