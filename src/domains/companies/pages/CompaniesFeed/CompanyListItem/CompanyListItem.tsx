import {
    Avatar,
    Box,
    Chip,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import take from 'lodash/take';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import type { Company } from 'types/companies';
import { stringToColor } from 'utils/stringToColor';

interface Props {
    company: Company;
}

const CompanyListItem = ({ company }: Props) => {
    return (
        <ListItem
            secondaryAction={
                <Link to={`/${company.id}`}>
                    <RemoveRedEyeIcon style={{ color: '#b8b8b8' }} />
                </Link>
            }
        >
            <ListItemAvatar >
                <Avatar
                    alt={company.name}
                    sx={{
                        bgcolor: stringToColor(company.name),
                    }}
                >
                    {company.name[0]}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="h6">
                        {company.name}
                    </Typography>
                }
                secondary={
                    <Typography variant="body1">
                        <a
                            href={company.website}
                            rel="noopener noreferrer"
                            style={{
                                color: '#000',
                            }}
                            target="_blank"
                        >
                            {company.website}
                        </a>
                    </Typography>
                }
            />
            <Box display="flex" gap={1}>
                {/**
                 * INFO: rendering just 3 tags here
                 * because some companies have huge number
                 * of tags so its not a good thing to display
                 * them all on companies listing page
                 */}
                {take(company.tags, 3).map((tag) => (
                    <Chip key={tag} label={tag} />
                ))}
            </Box>
            {/**
             * TODO: in real scenario we should display here
             * some other important attributes but because I
             * have limited time for the exercise and no time
             * for more advanced styling - I'm just leaving
             * this comment!
             */}
        </ListItem>
    );
};

export default memo(CompanyListItem);
