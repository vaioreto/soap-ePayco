import React from "react";
import { useRouter } from "next/router";
import AppBarAdmin from "../src/components/app-bar-admin/app-bar-admin";
import { CssBaseline, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        display: "flex",
        justifyContent: "center",
        marginTop: "4%",
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));

const Admin = (props) => {

    const router = useRouter();
    const classes = useStyles();    

    React.useEffect(() => {

        const auth = JSON.parse(localStorage.getItem('auth'));

        if (auth == null) {
            router.push('/auth/login');
        }

        return () => {

        }

    }, []);

    return (
        <>

            <div className={classes.root}>

                <CssBaseline />

                <AppBarAdmin />

                <main className={classes.content}>

                    <div className={classes.toolbar} />

                    {props.children}

                </main>

            </div>

        </>
    );
}

export default Admin;