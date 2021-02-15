
const businessLeasePage = require('../../src/ui/pages/BusinessLeaseVehiclesPage');

describe('My smoke test', () => {
    before(() => {
        businessLeasePage.open();
        businessLeasePage.acceptAllCookies();
    });

    it('should open main page', () => {

        $('a[data-key="Electric"]').click();

        browser.pause(10000);
    });
});


