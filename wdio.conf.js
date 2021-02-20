require('./log4js-config').init();

const wdioConfig = {
    runner: 'local',
    specs: [
        './specs/**/*.js'
    ],
    maxInstances: 1,

    // http://chromedriver.chromium.org/capabilities
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        // 'goog:chromeOptions': {
        //     'excludeSwitches': ['disable-popup-blocking'],
        //     prefs: {
        //         allowAllCookies: true,
        //         'profile.default_content_settings.cookies': 2,
        //         'profile.default_content_setting_values.notifications': 2,
        //         'profile.default_content_settings.popups': 2,
        //         'network.cookie.cookieBehavior': 2,
        //         'profile.default_content_setting_values.cookies': 2,
        //         'profile.block_third_party_cookies': true,
        //     }
        // }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.leaseplan.com/en-be/',

    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,

    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,

    // Default request retries count
    connectionRetryCount: 3,

    services: [],

    framework: 'mocha',
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },

    beforeSession: function (config, capabilities, specs) {
        if (process.env.DEBUG === '1') {
            // Giving debugger some time to connect...
            return new Promise(resolve => setTimeout(resolve, 5000));
        }
    },

    before: function (capabilities, specs) {
        browser.setWindowSize(1600, 1000);
    },

    afterStep: function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            browser.takeScreenshot();
        }
    },
}

if (process.env.SELENIUM_HUB_HOST) {
    wdioConfig.hostname = process.env.SELENIUM_HUB_HOST;
    wdioConfig.port = 4444;
    wdioConfig.path = '/wd/hub'
} else {
    wdioConfig.services = ["chromedriver"];
}

if (process.env.DEBUG === '1') {
    console.log('###### Running in debug mode! ######');
    wdioConfig.maxInstances = 1;
    wdioConfig['execArgv'] = ['--inspect=127.0.0.1:5858'];
    wdioConfig.mochaOpts.timeout = 360000;
}

exports.config = wdioConfig;
