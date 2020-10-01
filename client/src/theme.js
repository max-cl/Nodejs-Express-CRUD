import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500]
        },
        secondary: {
            light: '#A1A1A1',
            main: '#FFFFFF',
            dark: '#E1E1E1'
        }
    }
});