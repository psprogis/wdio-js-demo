const businessLeasePage = require('../../src/ui/pages/BusinessLeaseVehiclesPage');

describe('business lease filtering feature', () => {
    before(() => {
        businessLeasePage.open();
        businessLeasePage.acceptAllCookies();  // move to global before hook ?

        // TODO: setup initial state via REST API, db dump, etc. In this case we
        // will get deterministic behavior, can assert concrete numbers in search results, etc.
    });

    it.skip('should quick links, display standard set of filters and total cars number after opening', () => {
        const { quickLinkNames, filterNames, totalCarsNumber } = businessLeasePage.getPageSummary();

        expect(quickLinkNames).toEqual(['Electric', 'SUV', 'Automatic', 'Hybrid', 'Petrol', 'Premium']);
        expect(filterNames).toEqual(['Popular filters', 'Make & Model',
            'Monthly Price', '60 months · 10.000 km', 'Fuel type', 'More filters']);
        expect(totalCarsNumber).toBeGreaterThan(5000);
    });

    // create 2 specs: simple filtering and second one for the complex filters
    it('should filter all Mitsubishi cars', () => {
        businessLeasePage.fuelFilter.selectItem({ name: 'Diesel' });
        const filteringResults = businessLeasePage.getFilteringResults();

        expect(businessLeasePage.getTotalCarsNumber()).toBeGreaterThan(2000);
        expect(filteringResults.length).toBe(12);
        // show more filtered cars button exists: canShowMore() ?
        // move exapected results to data folder ?
        // expect(filteringResults).toEqual(expect.arrayContaining([
        //     {
        //         description: { topText: '23 to choose from', heading: 'BMW 3' },
        //         price: { localizedPrice: '€ 531' },
        //     },
        //     {
        //         description: { topText: '24 to choose from', heading: 'Volvo Xc40' },
        //         price: { localizedPrice: '€ 464' },
        //     },
        // ]));
    });

    it.skip('should work with complex filtering')

    it.skip('should reset all selected filters');

    it.skip('filters should be displayed after scrolling the page');

    it.skip('should contain more filters');

    it.skip('should allow to show more filtered results');

    it.skip('should save filters');

    // +1 spec: sorting results: most popular, by price (high, low)
});


