
class FilteringResults {

    get root() {
        return $('section[id="Car Offerings Grid Filtered"]');
    }

    getAllResults() {
        // TODO: best deals, no stress plan

        // TODO: find out how to wait that results block was completely loaded and remove pause
        browser.pause(1000);

        const results = [];
        this.root.$$('[data-component="VehicleCard"]').forEach(element => {
            const currentCar = {
                description: {},
                price: {},
            };

            const descriptionComponent = element.$('[data-component="VehicleDescription"]');
            currentCar.description.topText = descriptionComponent.$('[data-component="TopText"]').getText();
            currentCar.description.heading = descriptionComponent.$('[data-component="Heading"]').getText();
            // check if exists
            // currentCar.description.text = descriptionComponent.$('[data-component="Text"]').getText();

            const priceComponent = element.$('[data-component="Price"]');
            currentCar.price.localizedPrice =
                priceComponent.$('[data-component="Heading"] [data-component="LocalizedPrice"]').getText();
            // skip "discounts" for now

            results.push(currentCar);
        });

        return results;
    }

    canShowMore() {
        // fix selector, or the best solution: add test-id to Show more results button
        const showMoreButton = this.root.$$('button[data-e2e-button]')[13];

        return showMoreButton.isDisplayed();
    }
}

module.exports = FilteringResults;
