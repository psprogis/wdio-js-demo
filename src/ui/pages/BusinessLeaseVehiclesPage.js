const BasePage = require('./BasePage');

class BusinessLeaseVehiclesPage extends BasePage {
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
        // TODO: create filters component
        // [data-component="desktop-filters"]
        return $$('[data-component="desktop-filters"] [data-e2e-heading]').map(element => element.getText());
    }
}

module.exports = new BusinessLeaseVehiclesPage();
