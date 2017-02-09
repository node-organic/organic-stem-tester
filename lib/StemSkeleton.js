'use strict'
var exec = require('child_process').exec
var temp = require('temp')

module.exports = class StemSkeleton {
  constructor (mockStemSeedPath) {
    this.mockStemSeedPath = mockStemSeedPath
    this.targetDir = null
  }

  mockTestFolder (done) {
    temp.mkdir('mockStemFolder', (err, dirPath) => {
      if (err) return done(err)
      this.targetDir = dirPath
      console.info('INFO: using stem seed folder', this.mockStemSeedPath, ' stem mock', this.targetDir)
      this.shellExec([
        'cp -ra ' + this.mockStemSeedPath + '/* ' + this.targetDir
      ].join(' && '), {}, (err) => {
        if (err) return done(err)
        console.info('INFO: using stem mock folder', this.targetDir)
        done()
      })
    })
  }

  stackUpgrade (name, done) {
    return this.shellExec('angel stack use ' + name, {
      cwd: this.targetDir
    }, done)
  }

  exec (cmd, done) {
    return this.shellExec(cmd, {
      cwd: this.targetDir
    }, done)
  }

  removeMockedFolder (done) {
    console.info('removing stem mock folder', this.targetDir)
    return exec('rm -rf ' + this.targetDir, done)
  }

  shellExec (cmd, options, handler) {
    var child = exec(cmd, options, handler)
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    return child
  }

  forceExit (child, next) {
    require('killprocess')(child.pid, 'SIGINT', next || function noop () {})
  }
}
