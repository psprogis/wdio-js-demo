const BasePage = require('./BasePage');
const DropdownFilter = require('../components/DropdownFilter');

class BusinessLeaseVehiclesPage extends BasePage {
    constructor() {
        super();

        // TODO: hide all filters in Filters component
        this.fuelFilter = new DropdownFilter({ orderNumber: 5 });
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

    // results component
    getFilteringResults() {

        const root = $('section[id="Car Offerings Grid Filtered"]');
        // card [data-component="VehicleCard"]
        // TODO: best deals, no stress plan
        // description => data-component="VehicleDescription"
        // price => data-component="Price"

        const results = [];
        root.$$('[data-component="VehicleCard"]').forEach(element => {
            const currentCar = {
                description: {},
                price: {},
            };

            const descriptionComponent = element.$('[data-component="VehicleDescription"]');
            currentCar.description.topText = descriptionComponent.$('[data-component="TopText"]').getText();
            currentCar.description.heading = descriptionComponent.$('[data-component="Heading"]').getText();
            // currentCar.description.text = descriptionComponent.$('[data-component="Text"]').getText(); // FIXME

            const priceComponent = element.$('[data-component="Price"]');
            currentCar.price.localizedPrice = priceComponent.$('[data-component="LocalizedPrice"]').getText();
            // skip marketing bullshit with "discounts"

            results.push(currentCar);
        });

        return results;
    }
}

module.exports = new BusinessLeaseVehiclesPage();
