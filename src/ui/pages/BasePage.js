class BasePage {
    open(path) {
        return browser.url(path);
    }

    acceptAllCookies() {
        // wait to appear and check if exists?
        $('.accept-cookies-button').click();

        // or remove all the trash from view
        // browser.execute("document.getElementById('optanon-popup-bg').style.display = 'none';");
    }
}

module.exports = BasePage;
