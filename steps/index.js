const allure = require('@wdio/allure-reporter').default;
const businessLeasePage = require('../src/ui/pages/BusinessLeaseVehiclesPage');

module.exports.businessLeasePage = new Proxy(businessLeasePage, {
    get(target, prop) {
        const value = target[prop];

        if (typeof value === 'function') {
            return function(...args) {
                allure.startStep(`${prop}`);
                const result = target[prop](args);
                allure.endStep('passed');
                return result;
            }

        } else {
            return value;
        }
    }
});
