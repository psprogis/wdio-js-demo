const log = require('log4js').getLogger('spec-logger');
const businessLeasePage = require('../../src/ui/pages/BusinessLeaseVehiclesPage');
const dieselFilteringResults = require('../../expected-results/filtering/dieselsFirstPage');

describe('business lease filtering feature', () => {

    const defaultFilterNames = ['Popular filters', 'Make & Model', 'Monthly Price',
        '60 months · 10.000 km', 'Fuel type', 'More filters'];

    before(() => {
        // TODO: setup initial state via REST API, db dump, etc. In this case we
        // will get deterministic behavior, can assert concrete numbers in search results, etc.
    });

    beforeEach(() => {
        businessLeasePage.open();
        businessLeasePage.acceptAllCookies();  // move to global before hook ?
    });

    it('should display quick links, standard set of filters and total cars number after opening', () => {
        const { quickLinkNames, filterNames, totalCarsNumber } = businessLeasePage.getPageSummary();

        expect(quickLinkNames).toEqual(['Electric', 'SUV', 'Automatic', 'Hybrid', 'Petrol', 'Premium']);
        expect(filterNames).toEqual(defaultFilterNames);
        expect(totalCarsNumber).toBeGreaterThan(5000);
    });

    it('should filter all Diesel cars', () => {
        businessLeasePage.fuelFilter.selectSingleItem({ name: 'Diesel' });

        const filteringResults = businessLeasePage.getFilteringResults();

        expect(businessLeasePage.getTotalCarsNumber()).toBeGreaterThan(2000);
        expect(filteringResults.length).toBe(12);

        // we can assert all results or just check <n> items (see the next case)
        expect(filteringResults).toEqual(dieselFilteringResults);
    });

    it('should filter by 2+ criteria of the same filter', () => {
        businessLeasePage.fuelFilter.selectMultipleItems({ names: ['Diesel', 'Electric', 'Hybrid'] });

        const filteringResults = businessLeasePage.getFilteringResults();
        log.info(filteringResults);

        expect(businessLeasePage.getTotalCarsNumber()).toBeGreaterThan(2000);
        expect(filteringResults.length).toBe(12);

        // assert only 2 items or we can extract common verification logic into private function (see the next case)
        expect(filteringResults).toEqual(expect.arrayContaining([
            {
                description: { topText: '29 to choose from', heading: 'BMW 3' },
                price: { localizedPrice: '€ 531' },
            },
            {
                description: { topText: '31 to choose from', heading: 'Volvo Xc40' },
                price: { localizedPrice: '€ 464' },
            },
        ]));
    });

    it('should work with multiple filters', () => {
        businessLeasePage.fuelFilter.selectMultipleItems({ names: ['Diesel', 'Electric'] });
        businessLeasePage.popularFiltersFilter.selectSingleItem({ name: 'Best deals' });
        businessLeasePage.makeModelFilter.selectSingleItem({ name: 'Tesla' })

        const filteringResults = businessLeasePage.getFilteringResults();
        log.info(filteringResults);

        assertFilteringResults({
            totalCarsNumber: businessLeasePage.getTotalCarsNumber(),
            filteringResults,
            expected: {
                totalNumber: 2,
                resultsLength: 2,
                equal: [
                    {
                        description: {
                            topText: 'MY2021 - Available 3 months after reservation',
                            heading: 'Tesla 3'
                        },
                        price: { localizedPrice: '€ 625' }
                    },
                    {
                        description: {
                            topText: 'MY2021 - Available 3 months after reservation',
                            heading: 'Tesla 3'
                        },
                        price: { localizedPrice: '€ 729' }
                    }
                ],
            }
        });

        // for most common cases we can extract test data into separate file and generate tests using forEach
        // see example here: https://github.com/psprogis/protractor-automationpractice/blob/master/specs/search.spec.js#L18
    });

    it('should reset all selected filters', () => {
        const expectedFiltersAfterSelection = ['Configure yourself', 'Make & Model',
            'Monthly Price', '60 months · 10.000 km', 'Electric', 'More filters'];

        businessLeasePage.popularFiltersFilter.selectSingleItem({ name:'Configure yourself' });
        businessLeasePage.fuelFilter.selectSingleItem({ name: 'Electric' });

        const filtersAfterSelection = businessLeasePage.getFilterNames();
        expect(filtersAfterSelection).toEqual(expectedFiltersAfterSelection);

        businessLeasePage.resetAllFilters();

        const filtersAfterReset = businessLeasePage.getFilterNames();
        expect(filtersAfterReset).toEqual(defaultFilterNames);
    });

    it('should allow to show more filtered results', () => {
        businessLeasePage.fuelFilter.selectSingleItem({ name: 'Electric' });
        businessLeasePage.filteringResults.showMoreFilteredCars();

        const filteringResults = businessLeasePage.getFilteringResults();

        expect(filteringResults.length).toBeGreaterThan(12);
    });

    it.skip('filters should be displayed after scrolling the page');

    // TODO:
    // - add separate spec for quick filters
    // - create 2 specs: simple filtering and second one for the complex scenarios
    // add the following cases:
    //  - should save filters
    //  - should contain more filters, try body type and transmission
    //  - check url is changed: e.g.: ?fuelTypes=diesel,electric,hybrid ?
});

function assertFilteringResults({ totalCarsNumber, filteringResults, expected }) {
    expect(totalCarsNumber).toEqual(expected.totalNumber);
    expect(filteringResults.length).toBe(expected.resultsLength);
    expect(filteringResults).toEqual(expected.equal);
}
