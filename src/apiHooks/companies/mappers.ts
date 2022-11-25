import drop from 'lodash/drop';

import { Company } from 'types/companies';

export const mapCompanies = (rows: string[]): Company[] => {
    /**
     * INFO: we want to drop the header row of CSV
     */
    const companies = drop(rows, 1).map((row) => ({
        id: Number(row[0]),
        domain: row[1],
        name: row[3],
        website: row[4],
        founded_date: row[5],
        description: row[6],
        industry: row[7],
        tags: row[10]?.split(',').map((tag) => tag.trim()).filter(Boolean) || [],
        hq_location: row[11],
        total_funding_amount: row[13],
        email: row[rows[0].length - 2],
        phone: row[rows[0].length - 1],
    })) as Company[];

    return companies;
};
