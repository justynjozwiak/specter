import Papa from 'papaparse';

/**
 * INFO: PapaParse for more effective CSV parsing
 */

export const csvToJson = (csv: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(csv, {
            complete: (results) => {
                resolve(results.data as string[]);
            },
            error: (err: Error) => {
                reject(err);
            },
        });
    });
};