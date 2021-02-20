const DropdownFilter = require('./DropdownFilter');

class DropdownSearchFilter extends DropdownFilter {

    search({ name }) {
        throw new Error('not implemented');
    }

    // select should support sub-categories, e.g. Audi => A1
    // and scroll into view

}

module.exports = DropdownSearchFilter;
