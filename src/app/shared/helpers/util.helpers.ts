



export function removeAnalyticsheaders(analytics, headersToRemove) {
    const newAnalytics = {...analytics };
    headersToRemove.forEach(head => {
        const dataIndex = newAnalytics.headers.map(e => e.column).indexOf(head);
        const headerItem = newAnalytics.headers[dataIndex];
        // splice analytics headers
        newAnalytics.headers = newAnalytics.headers.filter(header => header.column !== headerItem.column);
        newAnalytics.rows = (newAnalytics.rows || []).map(row => {
            const newRow =  [];
            row.forEach((item, index) => {
                if (index !== dataIndex) {
                    newRow.push(item);
                }
            });
            return newRow;
        });
    });
    return newAnalytics;
}

export function transformAnalytics(analytics) {
    const headers = analytics.headers;
    const transformedData = (analytics.rows || []).map(row => {
        return {
            psi: row[itemIndex(headers, 'Event')],
            systemgenerateduid: row[itemIndex(headers, 'System Generated Case ID')],
            firstname: row[itemIndex(headers, 'First Name')],
            surname: row[itemIndex(headers, 'Surname')],
            sex: row[itemIndex(headers, 'Sex')],
            age: row[itemIndex(headers, 'Age')],
            email: row[itemIndex(headers, 'Email (Investigator)')],
            phone: row[itemIndex(headers, 'Phone number (Investigator)')],
            nationality: row[itemIndex(headers, 'Nationality')],
            enrollementdate: row[itemIndex(headers, 'Enrollment date')],
            orgunitname: row[itemIndex(headers, 'Organisation unit name')],
            orgunitid: row[itemIndex(headers, 'Organisation unit')],
            labresult: row[itemIndex(headers, 'Lab Test Result')]
        };
    });
    return transformedData;
}

export function itemIndex(headers, headername) {
    const itemindex = (headers || []).findIndex(
        head => head.column === headername
    );
    return itemindex;
}
