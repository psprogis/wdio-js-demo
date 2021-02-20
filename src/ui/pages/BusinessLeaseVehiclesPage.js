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
        // TODO: create filters component, use existing filters here
        return $$('[data-component="desktop-filters"] [data-e2e-heading]').map(element => element.getText());
    }

    getFilteringResults() {
        return this.filteringResults.getAllResults();
    }

    canShowMore() {
        throw new Error('not implemented yet.');
        return this.filteringResults.canShowMore();
    }
}

module.exports = new BusinessLeaseVehiclesPage();
