const DropdownFilter = require('./DropdownFilter');

// replace with factory ?
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
        })
    }

}

module.exports = OnPageFilters;
