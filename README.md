
## Task description

## General automation overview

## Local run
### Preconditions and environment
* Test should work on any linux/unix (CentOS, RedHat, Fedora, etc.) and Windows 10 (start from GitBash)
* node.js version v12.20.0 (or higher)
```bash
node -v
v14.15.5
```
* npm version 6.14.8. (package lock will be ignored with npm v less than 5)
```bash
npm -v
6.14.8
```
Note: do not use npm 7+, it is still unstable and has some compatibility issues, e.g. `package-lock` breaking changes.
* java to run selenium-standalone.
* python ? wdio requires python to use fibers  
* (optional for run w/o chromdriver service) webdriver-manager,
  run `webdriver-manager update` to get the latest versions of drivers
```bash
npm i -g webdriver-manager
webdriver-manager update
# status after update
webdriver-manager status
[18:05:42] I/status - selenium standalone version available: 3.141.59 [last]
[18:05:42] I/status - chromedriver versions available: 84.0.4147.30, 85.0.4183.87, 86.0.4240.22, 87.0.4280.88, 88.0.4324.96 [last]
[18:05:42] I/status - geckodriver versions available: v0.27.0, v0.29.0 [last]
[18:05:42] I/status - IEDriverServer is not present
[18:05:42] I/status - android-sdk is not present
[18:05:42] I/status - appium is not present
```

### How to run
```bash
cd wdio-js-demo/
npm i
# ...
npm t
# ...
npm run report
# ...
Report successfully generated to allure-report
Starting web server...
# ...
```

## Todo
- add automation diagram.
- add "cucumber" (allure) [steps](https://webdriver.io/docs/allure-reporter).
- (minor) eslint default parser does not work with static properties, fix configuration with babel-parser.
