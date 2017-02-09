# organic-stem-tester

A helper interface for testing organic-stem-skeleton based upgrades.

## usage

1. install `orgnaic-stem-tester`

```
npm install organic-stem-tester --save-dev
```

2. prepare a seed folder

```
$ mkdirp /home/my-stem-seed
$ cd /home/my-stem-seed
$ npm install angelscripts-stack-use organic-angel outbounder/organic-stem-skeleton
$ node ./node_modules/.bin/angel stack use core
... any other upgrades needed to be present in the stem seed
$ npm link /full/path/to/upgrade/folder
...
$ git init .
$ git add --all
$ git commit
```
2. require & use as global variable `StemSkeleton`

```
require('organic-stem-tester')

var stem = new StemSkeleton('/home/my-stem-seed')
stem.mockTestFolder(function (err) {}) // mocks a test folder at /tmp, while retaining linked node modules
stem.removeMockedFolder(function (err) {}) // removes the test folder

// bellow are executed towards the test folder as cwd
stem.stackUpgrade(String, function (err) {}) // exec $ angel stack use {String}
stem.exec(String, function (err) {}) // executes shell command
```
