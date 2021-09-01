import {black, blues, gradeColor, white, whites} from './colors'
import {createMuiTheme} from "@material-ui/core";


export const themes = createMuiTheme({
    typography: {
        fontFamily: [
            'Open Sans',
            'sans-serif',
        ].join(','),
    },
        overrides: {
            MuiSelect:{

            },

            MuiInput:{
                root: {
                    '&:before':{
                        display:"none",
                    },
                    '&:after': {
                        display:"none",
                    },
                },
            },
            MuiTextField:{
                root: {
                    '&:before':{
                        display:"none",
                    },
                    '&:after': {
                        display:"none",
                    },
                },

            },
        },
});


export const theme = {
    borderRadius: 12,
    breakpoints: {
        mobile: 400,
    },
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    color: {
        black,
        c074c52: "#074C52",
        c1CA17E: "#1CA17E",
        cF7F8FC:'#F7F8FC',
        // primary: {
        //     light: red[200],
        //     main: red[500],
        // },
        // secondary: {
        //     main: green[500],
        // },
        white,
        whites,
        blues

    },

    bgColor: {
        main:"#fff"
    },
    siteWidth: 1200,
    spacing: {
        1: 4,
        2: 8,
        3: 16,
        4: 20,
        5: 32,
        6: 48,
        7: 64,
    },
    topBarSize: 72,
    xs:'0px',
    sm:'600px',
    md:'960px',
    lg:'1280px',
    xl:'1920px',
    gradeColor:gradeColor,
};

