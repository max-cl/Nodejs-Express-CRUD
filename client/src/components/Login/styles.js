export const styles = (theme) => ({
    container:{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.dark
    },
    paperLogin: {
        padding: 30,
        borderRadius: 0,
        backgroundColor: theme.palette.secondary.main,
        textAlign: "center"
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '100%',
        marginBottom: 10
    },
    button: {
        width: '100%',
        color: 'white',
        fontWeight: 600,
        marginBottom: 10
    },
    containerButton: {
        width: '100%',
        padding: '10px 0'
    },
    errorMsg: {
        color: theme.palette.error.main
    },
    forgotPassword: {
        color: theme.palette.secondary.light,
        '&:hover': {
            fontSize: 16
        }
    },
    link: {
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addFormContainer: {
        height: '70%',
        width: '40%',
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main
    }
});