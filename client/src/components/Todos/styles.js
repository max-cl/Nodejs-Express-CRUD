export const styles = (theme) => ({
    table:{
        width: '40%'
    },
    tableHead: {
        backgroundColor: theme.palette.primary.light,
    },
    link: {
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    }
});