const DropdownFilter = require('./onpage-filters/DropdownFilter');
const DropdownSearchFilter = require('./onpage-filters/DropdownSearchFilter');

// replace with factory ? or move to index.js in onpage-filters
class OnPageFilters {

    constructor() {
        this.fuelFilter = new DropdownFilter({
            // create enum for item names?
            orderNumber: 5,
            supportedFilterIds: {
                'Diesel':  'fuelType-Diesel',
                'Electric': 'fuelType-Electric',
                'Petrol': 'fuelType-Petrol',
                'Hybrid': 'fuelType-Hybrid',
            }
        });

        this.popularFiltersFilter = new DropdownFilter({
            orderNumber: 1,
            supportedFilterIds: {
                'Best deals': 'Best deals',
                'Configure yourself': 'Configure yourself',
                'No stress plan': 'No stress plan',
            }
        });

        this.makeModelFilter = new DropdownSearchFilter({
            orderNumber: 2,
            supportedFilterIds: {
                'Audi': 'make-AUDI',
                'BMW': 'make-BMW',
                'Mercedes': 'make-MERCEDES',
                'Tesla': 'make-TESLA',
            },
        });
    }

}

module.exports = OnPageFilters;
