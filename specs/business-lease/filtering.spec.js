const businessLeasePage = require('../../src/ui/pages/BusinessLeaseVehiclesPage');

describe('business lease filtering feature', () => {
    before(() => {
        businessLeasePage.open();
        businessLeasePage.acceptAllCookies();
    });

    it('should quick links, display standard set of filters and total cars number after opening', () => {
        const { quickLinkNames, filterNames, totalCarsNumber } = businessLeasePage.getPageSummary();

        expect(quickLinkNames).toEqual(['Electric', 'SUV', 'Automatic', 'Hybrid', 'Petrol', 'Premium']);
        expect(filterNames).toEqual(['Popular filters', 'Make & Model',
            'Monthly Price', '60 months · 10.000 km', 'Fuel type', 'More filters']);
        expect(totalCarsNumber).toBeGreaterThan(5000);
    });

    // create 2 specs: simple filtering and second one for the complex filters
    it.skip('should filter all Mitsubishi cars');

    it.skip('should work with complex filter')

    it.skip('should reset all selected filters');

    it.skip('filters should be displayed after scrolling the page');
});


