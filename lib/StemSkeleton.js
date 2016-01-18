'use strict'
var exec = require('child_process').exec
var temp = require('temp')
// Automatically track and cleanup files at exit
temp.track()

module.exports = class StemSkeleton {
  constructor (stemSkeletonPath) {
    this.stemSkeletonPath = stemSkeletonPath
    this.targetDir = null
  }

  mockTestFolder (done) {
    temp.mkdir('mockStemFolder', (err, dirPath) => {
      if (err) return done(err)
      this.targetDir = dirPath
      var cmds = [
        'cp -LR ' + this.stemSkeletonPath + '/* ' + this.targetDir,
        'rm -rf ' + this.targetDir + '/.git'
      ]
      this.shellExec(cmds.join(' && '), {}, (err) => {
        if (err) return done(err)
        console.info('using stem mock folder', this.targetDir)
        this.shellExec('npm link ' + process.cwd(), {
          cwd: this.targetDir
        }, done)
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
