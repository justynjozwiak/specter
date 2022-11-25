import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import CompanyListItem from './CompanyListItem';

const MOCK_COMPANY = {
    id: 1,
    domain: 'tryspecter.com',
    name: 'Specter',
    website: 'https://tryspecter.com/',
    founded_date: 'Jan 2020',
    description: 'Lorem ipsum dolor',
    industry: 'Data',
    tags: ['tag1', 'tag2', 'tag3'],
    hq_location: 'London',
    total_funding_amount: '17000000',
    email: 'hello@tryspecter.com',
    phone: '(+40) 123 456 789',
};

/**
 * INFO: this is a very simple test
 * that just checks if attribtues are being
 * displayed properly, could be replaced with
 * snapshot as well
 */

describe('CompanyListItem', () => {
    it('renders correctly', () => {
        render(
            <CompanyListItem company={MOCK_COMPANY} />,
            /**
             * INFO: wraper should be actually added in
             * some "testSetup" file that is triggered before
             * the tests are actually run
             */
            { wrapper: BrowserRouter },
        );

        expect(screen.getByText('Specter')).toBeInTheDocument();
        expect(screen.getByText('https://tryspecter.com/')).toBeInTheDocument();

        MOCK_COMPANY.tags.forEach((tag) => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });

        const [companyWebsiteLink, goToCompanyLink] = screen.getAllByRole('link');

        expect(companyWebsiteLink).toHaveAttribute(
            'href',
            MOCK_COMPANY.website,
        );

        expect(goToCompanyLink).toHaveAttribute(
            'href',
            `/${MOCK_COMPANY.id}`,
        );
    });
});
