export const styles = (theme) => ({
    container:{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.dark
    },
    paper: {
        height: '25%',
        padding: 30,
        borderRadius: 0,
        backgroundColor: theme.palette.secondary.main,
        textAlign: "center"
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%'
    },
    textField: {
        width: '100%'
    },
    button: {
        width: '100%',
        color: 'white',
        fontWeight: 600
    },
    containerButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap'
    },
    link: {
        width: '100%',
        textDecoration: 'none'
    },
    loading: {
        margin: '1em',
        fontSize: '24px',
        color: theme.palette.primary.main
    },
    typographySuccess: {
        color: theme.palette.primary.main
    },
    typographyError: {
        color: theme.palette.error.main
    },
    containerContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexWrap: 'wrap'
    }
});