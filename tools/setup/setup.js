/* eslint-disable no-var */
var rimraf = require('rimraf');
var chalk = require('chalk');
var replace = require("replace");
var prompt = require("prompt");
var prompts = require('./setupPrompts');

var chalkSuccess = chalk.green;
var chalkProcessing = chalk.blue;
var chalkWarn = chalk.red;

/* eslint-disable no-console */

console.log(chalkSuccess('Dependencies installed.'));

prompt.start();

console.log(chalkWarn("WARNING:  Deleting local git repository..."));
prompt.get([{name: 'deleteGit', description: "Delete the git repository?  [Y/n]"}], function(err, result) {
  var deleteGit = result.deleteGit.toUpperCase();

  if (err) {
    process.exit(1);
  }

  function updatePackage() {
    console.log(chalkProcessing('Updating package.json settings:'));

    prompt.get(prompts, function(err, result) {
      const responses = [
        {
          key: 'name',
          value: result.projectName || 'new-project'
        },
        {
          key: 'version',
          value: result.version || '0.1.0'
        },
        {
          key: 'author',
          value: result.author
        },
        {
          key: 'license',
          value: result.license || 'MIT'
        },
        {
          key: 'description',
          value: result.description
        },
        {
          key: 'url',
          value: ''
        }
      ];

      responses.forEach(res => {
        replace({
          regex: `("${res.key}"): "(.*?)"`,
          replacement: `$1: "${res.value}"`,
          paths: ['package.json'],
          recursive: false,
          silent: true
        });
      });

      replace({
        regex: /"keywords": \[[\s\S]+?\]/,
        replacement: `"keywords": []`,
        paths: ['package.json'],
        recursive: false,
        silent: true
      });

      replace({
        regex: /\s*"setup":.*,/,
        replacement: "",
        paths: ['package.json'],
        recursive: false,
        silent: true
      });

      console.log(chalkSuccess('\nSetup complete! Cleaning up...\n'));
      rimraf('./tools/setup', error => {
        if (error) throw new Error(error);
      });
    });

  }

  if (deleteGit.match(/^N.*/)) {
    updatePackage();
  }
  else {
    rimraf('.git', error => {
      if (error) throw new Error(error);
      console.log(chalkSuccess('Original Git repository removed.\n'));
      updatePackage();
    });
  }
});
