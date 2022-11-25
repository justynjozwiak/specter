import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Company } from 'types/companies';
import { csvToJson } from 'utils/csvToJson';

import { getCompanies } from '../controllers';
import { getCompaniesQueryKey } from '../getQueryKeys';
import { mapCompanies } from '../mappers';

export const useCompanies = (
    options?: UseQueryOptions<Company[], AxiosError>,
): UseQueryResult<Company[], AxiosError> => {
    return useQuery(
        getCompaniesQueryKey(),
        async () => {
            const response = await getCompanies();

            const jsonRows = await csvToJson(response.data);

            /**
             * INFO: this is not super efficient but on the
             * other hand the case is not quite realistic as well,
             * normally we would get those companies paginated from API
             * in well formatted JSON, I'm going to pick here most important
             * attributes that I would like to display
             */
            return mapCompanies(jsonRows);
        },
        options,
    );
};
