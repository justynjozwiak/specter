import {
    Box,
    Chip,
    Divider,
    CircularProgress,
    Paper,
    Typography
} from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useCompanies } from 'apiHooks/companies/hooks';

const CompanyDetails = () => {
    const { companyId } = useParams<{ companyId: string }>();

    /**
     * INFO: couple of important points:
     *
     * 1) in production app we would normally have
     * separate API endpoint for fetching single company data,
     * so we would have to create separate hook "useCompany(id: number)"
     *
     * 2) thanks to react-query caching mechanism - using
     * "useCompanies" here again is not a performance issue for us
     * because companies are not fetched again using redundant request
     * but obtained from cache
     */
    const {
        data: companies,
        isLoading: isLoadingCompanies,
    } = useCompanies();

    const company = useMemo(() => {
        return companies?.find((company) => company.id === Number(companyId));
    }, [companies, companyId]);

    if (!company) {
        return null;
    }

    return (
        <Paper elevation={3}>
            <Box
                alignItems="center"
                display="flex"
                justifyContent="space-between"
                p={2}
            >
                <Link color="primary" to="/">
                    <ArrowCircleLeftOutlinedIcon
                        color="primary"
                        fontSize="large"
                        style={{
                            verticalAlign: 'middle',
                        }}
                    />
                </Link>
                <Typography align="center" variant="h4">
                    {company.name}
                </Typography>
                <div />
            </Box>
            <Divider />
            <Box display="flex" flexDirection="column" gap={1} p={2}>
                {/**
                 * INFO: normally we would extract these icon - value
                 * display to the separate component with props like
                 * icon: ReactNode & value: string | number
                 */}
                {company.website && (
                    <Box alignItems="center" display="flex" gap={2}>
                        <LanguageOutlinedIcon fontSize="large" />
                        <a
                            href={company.website}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <Typography>
                                {company.website}
                            </Typography>
                        </a>
                    </Box>
                )}
                {company.email && (
                    <Box alignItems="center" display="flex" gap={2}>
                        <EmailOutlinedIcon fontSize="large" />
                        <Typography>
                            {company.email}
                        </Typography>
                    </Box>
                )}
                {company.phone && (
                    <Box alignItems="center" display="flex" gap={2}>
                        <LocalPhoneOutlinedIcon fontSize="large" />
                        <Typography>
                            {company.phone}
                        </Typography>
                    </Box>
                )}
                {company.hq_location && (
                    <Box alignItems="center" display="flex" gap={2}>
                        <LocationOnOutlinedIcon fontSize="large" />
                        <Typography>
                            {company.hq_location}
                        </Typography>
                    </Box>
                )}
                {company.total_funding_amount && (
                    <Box alignItems="center" display="flex" gap={2}>
                        <MonetizationOnOutlinedIcon fontSize="large" />
                        <Typography>
                            Total funding: {company.total_funding_amount} USD
                        </Typography>
                    </Box>
                )}
            </Box>
            <Divider />
            {company.description && (
                <>
                    <Box p={2}>
                        <Typography>
                            {company.description}
                        </Typography>
                    </Box>
                    <Divider />
                </>
            )}
            {company.tags.length > 0 && (
                <Box display="flex" gap={1} flexWrap="wrap" p={2}>
                    {company.tags.map((tag) => (
                        <Chip key={tag} label={tag} />
                    ))}
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

export default CompanyDetails;
