import { RouteObject } from 'react-router-dom';

import CompaniesFeed from 'domains/companies/pages/CompaniesFeed';
import CompanyDetails from 'domains/companies/pages/CompanyDetails';

/**
 * INFO: again, this is simple route object for
 * the exercise purposes, normally we would wrap
 * everything in some <Layout /> parent component
 * and additionally display some Homepage under '/'
 * route... companies feed would normally be under
 * '/companies' route and single company details would
 * be on '/companies/:companyId' route, and would be
 * probably rendered as 'children' routes
 */
const routes: RouteObject[] = [
    {
        path: '/',
        element: <CompaniesFeed />,
    },
    {
        path: '/:companyId',
        element: <CompanyDetails />,
    },
];

export default routes;
