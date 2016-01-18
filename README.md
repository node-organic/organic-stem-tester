# organic-stem-tester

A helper interface for testing organic-stem-skeleton based upgrades.

## usage

1. install `orgnaic-stem-tester`

```
npm install organic-stem-tester --save-dev
```

2. require & use as global variable `StemSkeleton`

```
require('organic-stem-tester')

var stem = new StemSkeleton('path/to/organic-stem-skeleton')
stem.mockTestFolder(function (err) {})
stem.stackUpgrade(String, function (err) {}) // exec $ angel stack use {String}
stem.exec(String, function (err) {}) // executes shell command
stem.removeMockedFolder(function (err) {}) // removes the test folder
```
