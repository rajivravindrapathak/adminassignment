import { makeStyles } from "@mui/styles"
import login_background from './images/login_background.jpg'
export const Colors = {
    primaryDark: '#B97432',
    primaryLight: '#B97432',
    white: '#fff',
    whiteDark: '#F5F5F5',
    grayLight: '#ECEAEA',
    gray: '#A3A3A3',
    grayDark: '#666666',
    black: '#090A0A',
    greenLight: '#46BC67',
    greenDark: '#34A853',
    greenDark2: '#0A882D',
    green_parrot: '#5DC709',
    red: '#FF0000',
    red_a: '#eb2f06',
    blueFacebook: '#1877F2',
    skyblue: '#46A6FF',
    bodyColor: '#EDF2F5',
    splash_background: '#FFEDCA',
    light_Pink: '#f7e7d7',
    dark_Pink: '#EFD0B0',
    darkBlue: '#1B1B45',
};


export const useStyles = makeStyles({


    loginContainer: {
        backgroundImage: `url(${login_background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginBox: {
        padding: '2rem 2rem 2rem 2rem',
        backgroundColor: 'red',
        maxWidth: '30rem',
        borderRadius: 20,
        backgroundColor: 'white'
    },
    loginheadingContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    login: {
        fontSize: '1.2rem',
        marginTop: 10
    },

    loginheading: {
        fontSize: '2rem',
        fontFamily: 'Philosopher',
    },


    container: {
        display: 'flex',
        width: '100%',
        height: 'auto',
        padding: 20,
        color: '#000'
    },
    box: {
        width: '100%',
        height: 'auto',
        padding: 10,
        background: '#fff',
        boxShadow: '0px 0px 5px lightgrey',
        borderRadius: 15,
    },
    headingContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    heading: {
        fontSize: '2rem',
        fontFamily: 'Philosopher'
    },
    addButton: {
        padding: '5px 10px',
        backgroundColor: Colors.primaryDark,
        borderRadius: 10,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Philosopher',
        fontSize: '1.2rem',
        cursor: 'pointer'
    },
    addButtontext: {
        marginLeft: 5
    },
    submitbutton: {
        background: Colors.primaryLight,
        width: '100%',
        padding: '0.5rem',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        color: Colors.white,
        fontFamily: 'Philosopher',
        fontSize: '1.5rem',
        cursor: 'pointer'
    },
    denyButton: {
        background: Colors.bodyColor,
        width: '100%',
        padding: '0.5rem',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        color: Colors.black,
        fontFamily: 'Philosopher',
        fontSize: '1.5rem',
        cursor: 'pointer'
    },

    closeButton: {
        color: Colors.primaryDark,
        cursor: 'pointer',
        padding: 5,
        "&:hover": {
            backgroundColor: Colors.grayLight,
            borderRadius: 10,
        },
    },


    uploadContainer: {
        display: 'flex',
        alignItems: 'center',

    },
    uploadImageButton: {
        background: Colors.dark_Pink,
        width: '100%',
        padding: '0.5rem',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        color: Colors.black,
        fontFamily: 'Philosopher',
        fontSize: '1.2rem',
        cursor: 'pointer'
    },
    errorstyles: {
        color: '#d32f2f',
        fontSize: '0.8rem',
        fontFamily: 'arial',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        textAlign: 'left',
        marginTop: '3px',
        marginRight: '14px',
        marginBottom: 0,
        marginLeft: '14px',
    },
    
});