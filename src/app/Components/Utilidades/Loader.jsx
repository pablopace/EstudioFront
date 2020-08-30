import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    progress: {
        margin: theme.spacing(2)
    }
}));

const Loader = () => {
    return (
        <CircularProgress className={useStyles().progress} />
    );
}

export default Loader;
