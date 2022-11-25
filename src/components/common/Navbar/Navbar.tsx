import { Avatar, Box } from '@mui/material';

import SpecterLogo from 'images/specter_logo.webp';

/**
 * INFO: this should imitate the Navbar
 */

const avatarXsSize = {
    height: 200,
    width: 200,
};

const App = () => {
    return (
        <nav>
            <Box
                /**
                 * INFO: inline styling only for the purpose
                 * of the coding task, normally we should setup theme,
                 * wrap our app in <ThemeProvider /> with proper
                 * theme object as an argument and use styles for example
                 * with "makeStyles" function that creates the hook
                 */
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    /**
                     * INFO: especially for the things like
                     * paddings / margins we should use
                     * "theme.spacing()" function to keep spacing
                     * between site elements consistent!
                     */
                    marginBottom: '24px',
                }}
            >
                <Avatar
                    alt="Specter"
                    src={SpecterLogo}
                    sx={avatarXsSize}
                    variant="rounded"
                />
            </Box>
        </nav>
    );
};

export default App;