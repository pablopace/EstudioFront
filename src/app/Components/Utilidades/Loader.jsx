import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    progress: {
        margin: theme.spacing(1)
    }
}));

const Loader = () => {
    return (
        <LinearProgress className={useStyles().progress} />
    );
}

export default Loader;
