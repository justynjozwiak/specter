import { Container } from '@mui/material';
import { useRoutes } from 'react-router-dom';

import Navbar from 'components/common/Navbar';
import routes from 'routing/routes';

const App = () => {
    const renderRoutes = useRoutes(routes);

    return (
        <Container>
            <Navbar />
            {renderRoutes}
        </Container>
    );
};

export default App;