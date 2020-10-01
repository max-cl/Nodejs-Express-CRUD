export const styles = (theme) => ({
    backContainer: {
        height: '20vh',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 20
    },
    link: {
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    textField: {
        width: '100%'
    },
    button: {
        width: '100%',
        color: 'white',
        fontWeight: 600,
        marginBottom: 10
    },
    tableContainer: {
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    table:{
        width: '40%'
    },
    tableHead: {
        backgroundColor: theme.palette.primary.light,
    },
    updateFormContainer: {
        height: '20vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    }
});