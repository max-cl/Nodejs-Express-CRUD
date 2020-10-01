export const styles = (theme) => ({
    homeContainer: {
    },

    // Logout
    logoutContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },

    tableContainer: {
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    button: {
        width: '100%',
        color: 'white',
        fontWeight: 600,
        marginBottom: 10
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addFormContainer: {
        height: '40%',
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main
    },
    textField: {
        width: '100%'
    }
});