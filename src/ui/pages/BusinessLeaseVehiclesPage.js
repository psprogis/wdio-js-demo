const BasePage = require('./BasePage');

class BusinessLeaseVehiclesPage extends BasePage {
    open () {
        return super.open('business/showroom/');
    }
}

module.exports = new BusinessLeaseVehiclesPage();
