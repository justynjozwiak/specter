import type { AxiosPromise } from 'axios';

import axios from 'services/axios';

/**
 * INFO: controllers in this convention are just
 * wrappers around axios api calls
 */

export const getCompanies = (): AxiosPromise<string> => {
    return axios.get('/specter_data_challenge.csv');
};
