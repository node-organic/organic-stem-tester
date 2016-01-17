'use strict'
var exec = require('child_process').exec
var fs = require('fs')

module.exports = class StemSkeleton {
  constructor () {
    this.targetDir = null
  }

  mockTestFolder (targetDir, done) {
    if (!targetDir) throw new Error('targetDir argument required')
    this.targetDir = targetDir
    fs.exists(targetDir, (found) => {
      if (found) return done(new Error('targetDir should not exist ' + targetDir))

      var cmds = [
        'mkdir -p ' + targetDir,
        'cp -LR ./node_modules/stem-skeleton/* ' + targetDir,
        'rm -rf ' + targetDir + '/.git'
      ]
      this.shellExec(cmds.join(' && '), {}, done)
    })
  }

  stackUpgrade (name, done) {
    this.shellExec('angel stack use ' + name, {
      cwd: this.targetDir
    }, done)
  }

  exec (cmd, done) {
    return this.shellExec(cmd, {
      cwd: this.targetDir
    }, done)
  }

  removeMockedFolder (done)  {
    exec('rm -rf ' + this.targetDir, done)
  }

  shellExec (cmd, options, handler) {
    var child = exec(cmd, options, handler)
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    return child
  }
}
