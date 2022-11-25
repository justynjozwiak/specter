import type { QueryKey } from '@tanstack/react-query';

import { COMPANIES_QUERY_KEY } from 'apiHooks/base';

export const getCompaniesQueryKey = (): QueryKey => [COMPANIES_QUERY_KEY];

/**
 * INFO: the reason for why I'm creating separate functions
 * for getting query keys is that very often we want to put
 * as a query key not only a string but more advanced structure,
 * for example filtering / sorting params - so when user wants to fetch
 * the data with the same params again - React Query will not perform
 * redundant request but get proper data from cache instead which is
 * huge performance improvement
 *
 * examples:
 *
 * export const getCompaniesQueryKey = (
 *      params: { sortBy: string, direction: 'asc' | 'desc' }
 * ): QueryKey => [COMPANIES_QUERY_KEY, params];
 *
 * export const getCompanyQueryKey = (id: number): QueryKey => [
 *      COMPANY_QUERY_KEY,
 *      id,
 * ];
 */