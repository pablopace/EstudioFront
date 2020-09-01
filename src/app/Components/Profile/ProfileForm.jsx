import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, Icon, Grid, Radio, RadioGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Label } from "recharts";
import axios from "axios"
import { withSnackbar } from 'notistack';

const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT

class ProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      firstName: "",
      surName: "",
      email: "",
      date: new Date(),
      mobile: ""
    }
  }


  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });


    axios.get(BACKEND + "/api/user/active")
      .then(response => {
        console.log("user/active ", response)
        if (response.status >= 200 && response.status <= 299) {
          return response.data.data.user;
        } else {
          throw Error(response.statusText);
        }
      })
      .then(user => {
        console.log("data.user.user", user)
        this.setState({
          username: user.user,
          firstName: user.name,
          surName: user.surname
        })

      })




  }

  componentWillUnmount() {
   
  }

  handleSubmit = event => {
    // console.log("submitted");
    // console.log(event);
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = date => {
    // console.log(date);

    this.setState({ date });
  };

  render() {
    let {
      username,
      firstName,
      surName,
      mobile,
      date,
      email
    } = this.state;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                disabled="true"
                className="mb-4 w-full"
                label="Username"
                type="text"
                name="username"
                value={username}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Nombre"
                onChange={this.handleChange}
                type="text"
                name="firstName"
                value={firstName}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Apellido"
                onChange={this.handleChange}
                type="text"
                name="surName"
                value={surName}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Email"
                onChange={this.handleChange}
                type="email"
                name="email"
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="mb-4 w-full"
                  margin="none"
                  id="mui-pickers-date"
                  label="Date picker"
                  inputVariant="standard"
                  type="text"
                  autoOk={true}
                  value={date}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>

            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Mobile Nubmer"
                onChange={this.handleChange}
                type="text"
                name="mobile"
                value={mobile}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />

            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <span className="pl-2 capitalize">Enviar</span>
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default ProfileForm;
