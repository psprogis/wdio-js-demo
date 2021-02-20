class BasePage {
    open(path) {
        return browser.url(path);
    }

    acceptAllCookies() {
        const acceptButton = $('.accept-cookies-button');

        try {
            acceptButton.waitForExist({
                timeout: 0,
            });

            acceptButton.click();
        } catch (e) {
            // got unexpected error
            if (!e.message.includes('element not interactable')) {
                throw e;
            }
        }

        // or remove all the trash from view
        // browser.execute("document.getElementById('optanon-popup-bg').style.display = 'none';");
    }
}

module.exports = BasePage;
