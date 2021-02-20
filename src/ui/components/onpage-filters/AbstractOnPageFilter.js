
class AbstractOnPageFilter {

    getTitle() {
        return this.root.$('[data-e2e-heading]').getText();
    }

    open() {
        // check if already opened ^ direction is up

        this._toggle();

        // check items appear
    }

    // probably the most strange functionality
    save() {
        throw new Error('not implemented yet');
    }

    close() {
        // check if already closed ^ direction is down

        this._toggle();

        // check items were hidden
    }

    _toggle() {
        this.root.click();
    }
}

module.exports = AbstractOnPageFilter;
