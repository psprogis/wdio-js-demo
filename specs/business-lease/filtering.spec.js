const log = require('log4js').getLogger('spec-logger');
const businessLeasePage = require('../../src/ui/pages/BusinessLeaseVehiclesPage');
const dieselFilteringResults = require('../../expected-results/filtering/dieselsFirstPage');

describe('business lease filtering feature', () => {

    before(() => {
        // TODO: setup initial state via REST API, db dump, etc. In this case we
        // will get deterministic behavior, can assert concrete numbers in search results, etc.
    });

    beforeEach(() => {
        businessLeasePage.open();
        businessLeasePage.acceptAllCookies();  // move to global before hook ?
    });

    it('should quick links, display standard set of filters and total cars number after opening', () => {
        const { quickLinkNames, filterNames, totalCarsNumber } = businessLeasePage.getPageSummary();

        expect(quickLinkNames).toEqual(['Electric', 'SUV', 'Automatic', 'Hybrid', 'Petrol', 'Premium']);
        expect(filterNames).toEqual(['Popular filters', 'Make & Model',
            'Monthly Price', '60 months · 10.000 km', 'Fuel type', 'More filters']);
        expect(totalCarsNumber).toBeGreaterThan(5000);
    });

    // create 2 specs: simple filtering and second one for the complex filters
    it('should filter all Diesel cars', () => {
        businessLeasePage.fuelFilter.selectSingleItem({ name: 'Diesel' });

        const filteringResults = businessLeasePage.getFilteringResults();
        log.info(filteringResults);

        expect(businessLeasePage.getTotalCarsNumber()).toBeGreaterThan(2000);
        expect(filteringResults.length).toBe(12);

        // expect(businessLeasePage.canShowMore()).toBe(true);

        // we can assert all results
        // expect(filteringResults).toEqual(dieselFilteringResults);
        // or just check 2 items
        expect(filteringResults).toEqual(expect.arrayContaining([
            {
                description: { topText: '23 to choose from', heading: 'BMW 3' },
                price: { localizedPrice: '€ 531' },
            },
            {
                description: { topText: '24 to choose from', heading: 'Volvo Xc40' },
                price: { localizedPrice: '€ 464' },
            },
        ]));
    });

    it.skip('should filter by 2+ criteria of the same filter', () => {
        businessLeasePage.fuelFilter.selectMultipleItems({ names: ['Diesel', 'Electric', 'Hybrid'] });
        // TODO: extract common verification part and use it here
    });

    it.skip('should work with multiple filters', () => {
        businessLeasePage.fuelFilter.selectMultipleItems({ names: ['Diesel', 'Electric'] });
        businessLeasePage.popularFiltersFilter.selectSingleItem({ name: 'Best deals' });
        businessLeasePage.makeModelFilter.selectSingleItem({ name: 'Tesla' })

        // TODO: extract common verification part and use it here
    });

    it.skip('should reset all selected filters');

    it.skip('filters should be displayed after scrolling the page');

    it.skip('should contain more filters');

    it.skip('should allow to show more filtered results');

    it.skip('should save filters');
});


