module.exports = `
    union personSearch = Client | Vendor

    type personQuery {
        firstSearchResult: personSearch
    }
`;
