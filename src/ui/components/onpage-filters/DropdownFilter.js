const log = require('log4js').getLogger('dropdown-filter');
const AbstractFilter = require('./AbstractOnPageFilter');

class DropdownFilter extends AbstractFilter {

    // can be moved to configuration
    static timeouts = {
        selectionUpdate: 3000,
    };

    constructor({ orderNumber, supportedFilterIds }) {
        super();
        this.orderNumber = orderNumber;
        this.supportedFilterIds = supportedFilterIds;
    }

    get root() {
        // or find by name and go up, e.g. data-key="fuelTypes" but in this case we have to use xpath
        // TODO: can be moved to parent component, e.g. OnPageFilters
        const baseSelector = '[data-component="desktop-filters"] [class^=FiltersContainer] [data-key="OnPageFilter"]';
        const number = this.orderNumber - 1;  // TODO: check number is valid

        return $$(baseSelector)[number];
    }

    selectSingleItem({ name, close = true }) {
        const currentTitle = this.getTitle();
        log.debug(`current title: ${currentTitle}`);

        if (currentTitle === name) {
            log.info(`filter is already in correct state, current title: ${currentTitle}, nothing to select.`);
            return;
        }

        this.open();
        // x:2, y:2 - workaround to click on checkbox, does not work with default coordinates
        // need to be investigated or we can execute javascript and select checkbox automatically
        this._select({ name });

        browser.waitUntil(() => {
            const newTitle = this.getTitle();
            log.debug(`new title: ${newTitle}`);

            return newTitle === name;  // or we can track results container updates
        }, {
            timeout: DropdownFilter.timeouts.selectionUpdate,
            timeoutMsg: 'dropbox has incorrect state, title has not been changed after selection.',
        });

        // not the best solution, but ok for now
        if (close) {
            this.close();
        }
    }

    selectMultipleItems( { names } ) {
        this.open();

        names.forEach(name => this._select({ name }));

        this.close();
    }

    _select({ name }) {
        if (!Object.keys(this.supportedFilterIds).includes(name)) {
            throw new Error(`item ${name} cannot be selected`);
        }

        // do not use #, since some ids contains more than 1 word
        this.root.$(`[id="${this.supportedFilterIds[name]}"]`).click({ x: 2, y: 2 });
    }
}

module.exports = DropdownFilter;
