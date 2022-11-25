import {
    Box,
    CircularProgress,
    Divider,
    List,
    Pagination,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import slice from 'lodash/slice';
import { Fragment, useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { useCompanies } from 'apiHooks/companies/hooks';

import CompanyListItem from './CompanyListItem';

/**
 * INFO: should probably be globally defined
 * and move to some consts file
 */
const PER_PAGE = 10;

const CompaniesFeed = () => {
    const {
        data: companies,
        isLoading: isLoadingCompanies,
    } = useCompanies();

    const [page, setPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');

    /**
     * INFO: couple of important points:
     *
     * 1) in production app we would surely have
     * paginated API so handling pagination would be
     * different - we would use "useInfiniteQuery" hook
     * from react-query library and use already implemented
     * functions like "fetchNextPage" / "fetchPreviousPage", etc.
     *
     * 2) in real case scenario things like per_page and page_count
     * could potentially come from the API so we wouldn't have to
     * define them
     *
     * 3) useMemo - because we would like to make this
     * calculation only when "companies" change (for example
     * when we apply API based filtering), not with every
     * rerender of the component
     *
     * 4) even with this primitive implementation we can
     * achieve better performance than we would have by
     * just displaying ~4k items at once, alternative
     * would be to implement pseudo "infinite scrolling"
     * by using some virtualization library or just simple
     * react-intersection-observer to render only those
     * companies that are actually in the viewport
     */
    const filteredCompanies = useMemo(() => {
        if (searchValue) {
            return companies?.filter(
                (company) =>
                    company.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        return companies;
    }, [companies, searchValue]);

    const paginatedCompanies = useMemo(() => {
        return slice(filteredCompanies, (page - 1) * PER_PAGE, page * PER_PAGE);
    }, [filteredCompanies, page]);

    const pagesCount = useMemo(() => {
        if (filteredCompanies && filteredCompanies.length > 0) {
            return Math.ceil(filteredCompanies.length / PER_PAGE);
        }

        return 0;
    }, [filteredCompanies]);

    useEffect(() => {
        if (page > pagesCount) {
            setPage(1);
        }
    },[page, pagesCount]);

    const onChangePage = (
        _event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
    };

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const showNoResultsFound = searchValue && filteredCompanies?.length === 0;

    return (
        <Paper elevation={3}>
            <Box p={2}>
                {/**
                 * INFO: this is not how normally we would do this,
                 * for more complex filters we would probably create
                 * a form using "formik" library for example and extract
                 * the form to the separate component
                 */}
                <TextField
                    fullWidth
                    inputProps={{
                        /**
                         * INFO: we should pass accessibility props
                         * through "inputProps" so they are actually
                         * assigned to the real input instead of
                         * divs that wrap the input
                         */
                        'aria-label': 'Search by name',
                    }}
                    label="Search by name"
                    onChange={onSearchChange}
                    value={searchValue}
                />
            </Box>
            {!isLoadingCompanies && (
                <List style={{ padding: 0 }}>
                    {paginatedCompanies?.map((company) => (
                        <Fragment key={company.id}>
                            <CompanyListItem company={company} />
                            <Divider />
                        </Fragment>
                    ))}
                </List>
            )}
            {pagesCount > 0 && (
                <Box
                    display="flex"
                    justifyContent="center"
                    py={2}
                >
                    <Pagination
                        color="primary"
                        count={pagesCount}
                        onChange={onChangePage}
                        page={page}
                        size="large"
                    />
                </Box>
            )}
            {showNoResultsFound && (
                <Box
                    display="flex"
                    justifyContent="center"
                    px={2}
                    pt={4}
                    pb={5}
                >
                    <Typography>
                        No results found.
                    </Typography>
                </Box>
            )}
            {isLoadingCompanies && (
                <Box
                    display="flex"
                    justifyContent="center"
                    px={2}
                    pt={4}
                    pb={5}
                >
                    <CircularProgress color="primary" />
                </Box>
            )}
        </Paper>
    );
};

export default CompaniesFeed;
