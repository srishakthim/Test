import { createTheme } from '@mui/material/styles';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

const customTheme = createTheme({
    typography: {
        fontFamily: 'Poppins', // Poppins is now available for use
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: 'Poppins',
                    scrollBehavior: 'smooth',
                },
            },
        },
    },

});

export default customTheme;
