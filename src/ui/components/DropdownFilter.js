class DropdownFilter {
    constructor({ orderNumber }) {
        this.orderNumber = orderNumber;

        // generate this list dynamically ?
        // can be extanded, e.g.: filterName: { id, expectedText, etc. }
        this.supportedFilterIds = {
            'Diesel':  '#fuelType-Diesel',
            'Electric': '#fuelType-Electric',
            'Petrol': '#fuelType-Petrol',
            'Hybrid': 'fuelType-Hybrid',
        };
    }

    get root() {
        // [data-component="desktop-filters"] [class^=FiltersContainer] [data-key="OnPageFilter"]
        // data-key="fuelTypes" but in this case we have to use xpath
        const baseSelector = '[data-component="desktop-filters"] [class^=FiltersContainer] [data-key="OnPageFilter"]';
        const number = this.orderNumber - 1;  // TODO: check number is valid

        return $$(baseSelector)[number];
    }

    open() {
        // check if already opened ^ direction is up

        this.toggle();

        // check items appear
    }

    getTitle() {
        return this.root.$('[data-e2e-heading]').getText();
    }

    selectItem({ name, close = true }) {
        if (!this.supportedFilterIds.keys().include(name)) {
            throw new Error(`fuel filter ${name} cannot be selected`);
        }

        this.open();
        this.root.$(this.supportedFilterIds[name]).click({ x: 2, y: 2 });

        // TODO: wait title change

        // not the best solution, but ok for now
        if (close) {
            this.close();
        }
    }

    selectMultipleItems( { names } ) {
        names.forEach(name => this.selectItem({ name, close: false }));

        this.close();
    }

    // probably the most strange functionality
    save() {
        throw new Error('not implemented yet');
    }

    close() {
        // check if already closed ^ direction is down

        this.toggle();

        // check items were hidden
    }

    toggle() {
        this.root.click();
    }
}

module.exports = DropdownFilter;
