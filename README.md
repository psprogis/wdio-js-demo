
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
* jdk11+ if you run selenium-standalone.
* python3 and VSBuild tools since wdio works with fibers (will be installed during node.js installation).
  You should not do any additional installation with node14+, but if you get the following errors:
  ```bash
  MSBUILD : error MSB3428: Could not load the Visual C++ component "VCBuild.exe". To fix this, 1) install the .NET Framework 2.0 SDK, 2) install Microsoft Visual Studio 2005 or 3) add the location of the component to the system path if it is installed elsewhere.
  Failed at the fibers@5.0.0 install script
  ```
  Follow the [https://github.com/nodejs/node-gyp#on-unix](instructions) to fix this.
  
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
- extract common verification steps and re-use them in several testcases.
- add "cucumber" (allure) [steps](https://webdriver.io/docs/allure-reporter).
- (minor) eslint default parser does not work with static properties, fix configuration with babel-parser.
