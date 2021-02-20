const log = require('log4js').getLogger('dropdown-filter');

class DropdownFilter {

    // generate this list dynamically ?
    // can be extanded, e.g.: filterName: { id, expectedText, etc. }
    static supportedFilterIds = {
        'Diesel':  'fuelType-Diesel',
        'Electric': 'fuelType-Electric',
        'Petrol': 'fuelType-Petrol',
        'Hybrid': 'fuelType-Hybrid',
    };

    // can be moved to configuration
    static timeouts = {
        selectionUpdate: 3000,
    };

    constructor({ orderNumber }) {
        this.orderNumber = orderNumber;
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
        if (!Object.keys(DropdownFilter.supportedFilterIds).includes(name)) {
            throw new Error(`fuel filter ${name} cannot be selected`);
        }

        const currentTitle = this.getTitle();
        log.debug(`current title: ${currentTitle}`);

        if (currentTitle === name) {
            log.info(`filter is already in correct state, current title: ${currentTitle}, nothing to select.`);
            return;
        }

        this.open();
        // x:2, y:2 - workaround to click on checkbox, does not work with default coordinates
        // need to be investigated or we can execute javascript and select checkbox automatically
        this.root.$(`#${DropdownFilter.supportedFilterIds[name]}`).click({ x: 2, y: 2 });

        browser.waitUntil(() => {
            const newTitle = this.getTitle();
            log.debug(`new title: ${newTitle}`);

            return newTitle === name;  // or we can track results container updates
        }, {
            timeout: DropdownFilter.timeouts.selectionUpdate,
            timeoutMsg: 'dropbox has incorrect state, title has not been chaged after selection.',
        });

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
