const log = require('log4js').getLogger('business-showroom');
const BasePage = require('./BasePage');
const OnPageFilters = require('../components/OnPageFilters');
const FilteringResults = require('../components/FilteringResults');

class BusinessLeaseVehiclesPage extends BasePage {
    constructor() {
        super();

        // export created object from OnPageFilters? or use factory with static methods ?
        const onPageFilters = new OnPageFilters();

        this.fuelFilter = onPageFilters.fuelFilter;
        this.popularFiltersFilter = onPageFilters.popularFiltersFilter;
        this.makeModelFilter = onPageFilters.makeModelFilter;

        this.filteringResults = new FilteringResults();
    }

    open() {
        return super.open('business/showroom/');
    }

    getPageSummary() {
        return {
            quickLinkNames: this.getQuickLinkNames(),
            totalCarsNumber: this.getTotalCarsNumber(),
            filterNames: this.getFilterNames(),
        };
    }

    getQuickLinkNames() {
        return $$('[data-component="QuickFilterLink"]').map(element => element.getText());
    }

    getTotalCarsNumber() {
        // find better selector ?
        const fullText = $$('[data-key="features.showroom.toChooseFrom"]')[0].getText();

        return parseInt(fullText.split(' ')[0]);
    }

    getFilterNames() {
        // TODO: use existing filter classes here, move "improved" getText into Filter class
        // run on CI is slow, do not return text right away, wait until it is not empty.
        return $$('[data-component="desktop-filters"] [data-e2e-heading]').map(element => {
            let currentText;

            browser.waitUntil(() => {
                currentText = element.getText();
                log.debug(`filter's text: ${currentText}`);

                return currentText !== '';
            }, {
                timeout: 3000,
                timeoutMsg: "filter's name is empty after 3 seconds.",
            });

            return currentText;
        });
    }

    getFilteringResults() {
        return this.filteringResults.getAllResults();
    }

    resetAllFilters() {
        $('[data-key="resetFilters"]').click();
    }

    canShowMore() {
        return this.filteringResults.canShowMore();
    }
}

module.exports = new BusinessLeaseVehiclesPage();
